import fs from 'fs';
import path from 'path';
import metalsmith from 'metalsmith';
import handlebars from 'handlebars';
import yaml from 'yaml';
import _ from 'lodash';

export interface PathObj {
  post?: Object;
  get?: Object;
  delete?: Object;
  put?: Object;
  patch?: Object;
  [otherMethod: string]: any;
}
export interface YamlPaths {
  [path: string]: PathObj;
}
export type ReadYaml = (file: string) => void;

let paths: YamlPaths;
let definitions;

export const readYaml: ReadYaml = file => {
  const stats = fs.statSync(file);
  if (!stats.isFile()) {
    console.error('读取的不是文件');
  }
  const yamlFile = fs.readFileSync(file, { encoding: 'utf8' });
  const parsedObj = yaml.parse(yamlFile);
  paths = parsedObj.paths;
  definitions = parsedObj.definitions;
};

export interface ApiObj {
  path: string;
  method: string;
  params?: Array<string>; // query object
  pathParams?: Array<string>;
  data?: object; // 对应body
  headers?: object;
  hasData?: boolean;
  [tempKey: string]: any;
}
export const parsePathsToApi = (paths: YamlPaths) => {
  const result = [];
  for (let path in paths) {
    for (let method in paths[path]) {
      let temp: ApiObj = {
        path,
        method,
        ...paths[path][method]
      };
      result.push(temp);
    }
  }
  return result;
};

readYaml(path.join(__dirname, '../swagger.yaml'));
const apiObjs = parsePathsToApi(paths);
export const parseApiToAxiosExample = (apiObj: ApiObj) => {
  let ex: ApiObj = {
    path: apiObj.path,
    method: apiObj.method,
    params: [],
    pathParams: []
  };

  apiObj.parameters.forEach((param: any) => {
    if (param.in === 'path') {
      // 插入到路径中
      ex.pathParams.push(param.name);
    } else if (param.in === 'query') {
      // 插入到query中，即axios的params参数
      ex.params.push(param.name);
    } else if (param.in === 'body') {
      // body即data
      ex.hasData = true;
    }
  });
  return ex;
};

const axiosExs = apiObjs.map(api => parseApiToAxiosExample(api));

// /restful/:id/:list/{id} -> restful_by_id_list_by_id
const parseApiName = (path: string): string => {
  const parsePath = path
    .replace(/}/g, '')
    .replace(/{|:/g, 'by/')
    .split('/')
    .filter(item => !!item)
    .join('_');
  return _.upperFirst(_.camelCase(parsePath));
};
handlebars.registerHelper('parseApiName', parseApiName);

// TODO：
// 暂时只匹配{}包裹的参数
const parseUrl = (path: string, pathParams: string[]): string => {
  let str = '';
  pathParams.forEach(param => {
    let reg = new RegExp(`{${param}}`);
    str = path.replace(reg, '${data.' + param + '}');
  });
  return str || path;
};
handlebars.registerHelper('parseUrl', parseUrl);

metalsmith(path.resolve(__dirname, '../'))
  .source('api-template')
  .destination('test-api')
  .use((files, metalsmith, done) => {
    Object.keys(files).forEach(filename => {
      const content = files[filename].contents.toString('utf8');
      const template = handlebars.compile(content)({
        apis: axiosExs
      });
      //   修改文件名
      const destFileName = filename.replace(/hbs$/, 'js');
      files[filename].contents = template;
      files[destFileName] = files[filename];
      delete files[filename];

    });
    done(undefined, files, metalsmith);
  })
  .build(err => {
    console.log(err);
  });
