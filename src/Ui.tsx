import React, { useState, useCallback, useEffect } from 'react';
import { Box, Color, StdinContext } from 'ink';
import path from 'path';
import TextInput from 'ink-text-input';
import SelectInput, { Item } from 'ink-select-input';
import Spinner from 'ink-spinner';
import { generateAdminTemplate } from './utils';
import config from './config';
enum VIEW {
  INPUT_TITLE = 'INPUT_TITLE',
  SELECT_TYPE = 'SELECT_TYPE'
}

export enum TEMPLATE_TYPE {
  IVIEW_ADMIN = 'IVIEW_ADMIN',
  CRUD_TEMPLATE = 'CRUD_TEMPLATE'
}

const selectTypes = [
  {
    label: TEMPLATE_TYPE.IVIEW_ADMIN,
    value: TEMPLATE_TYPE.IVIEW_ADMIN
  }
  // {
  //   label: TEMPLATE_TYPE.CRUD_TEMPLATE,
  //   value: TEMPLATE_TYPE.CRUD_TEMPLATE
  // }
];

const ENTER = '\r';
const CTRL_C = '\x03';

type WithStdin<X> = X & {
  readonly stdin: NodeJS.ReadStream;
  readonly setRawMode: NodeJS.ReadStream['setRawMode'];
};

type Status = 'EDITING' | 'GENERATING' | 'OK' | 'FAILED';

const Ui: React.FC<WithStdin<{}>> = ({ stdin, setRawMode }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TEMPLATE_TYPE | React.Key>(TEMPLATE_TYPE.IVIEW_ADMIN);
  const [status, setStatus] = useState<Status>('EDITING');

  useEffect(() => {
    if (setRawMode) setRawMode(true);
    stdin.on('data', handleInput);
    return () => {
      if (setRawMode) setRawMode(true);
      stdin.removeListener('data', handleInput);
    };
  });
  const handleInput = async (data: any) => {
    const s = String(data);
    if (s === CTRL_C) process.exit(0);
    if (s === ENTER) {
      setStatus('GENERATING');
      try {
        generateAdminTemplate(path.resolve(process.cwd(), title));
        // await downloadRepo(config['admin-template-repo'], path.resolve(process.cwd(), title)); //太慢
        setStatus('OK');
      } catch (e) {
        console.log(e);
        setStatus('FAILED');
      } finally {
        process.exit(0);
      }
    }
  };
  const handleTitleChange = (value: string) => {
    setTitle(value);
  };
  const handleHighlight = (item: Item) => {
    const value = item.value;
    setType(value);
  };
  const renderFunc = () => {
    if (status === 'GENERATING') {
      return (
        <Box flexDirection="row">
          <Box marginRight={1}>
            <Color green>
              <Spinner type="dots" />
            </Color>
          </Box>
          <Box>
            <Color blackBright>生成中...</Color>
          </Box>
        </Box>
      );
    }
    if (status === 'FAILED') {
      return (
        <Box>
          <Color redBright>生成失败,请重试</Color>
        </Box>
      );
    }
    if (status === 'OK') {
      return (
        <Box>
          <Color greenBright>成功</Color>
        </Box>
      );
    }
    if (status === 'EDITING') {
      return (
        <Box flexDirection="column">
          <Box flexDirection="row">
            <Box marginRight={1}>
              <Color cyan>输入项目名称:</Color>
            </Box>
            <TextInput value={title} onChange={handleTitleChange} placeholder="输入项目名..." />
          </Box>
          <SelectInput items={selectTypes} onHighlight={handleHighlight} />
        </Box>
      );
    }
  };
  return (
    <Box flexDirection="column">
      <Box>输入项目名并选择项目类型后，按Enter确认/CtrlC退出.</Box>
      {renderFunc()}
    </Box>
  );
};

const UiWithStdin: React.FC = props => {
  return (
    <StdinContext.Consumer>
      {({ stdin, setRawMode }) => <Ui {...props} stdin={stdin} setRawMode={setRawMode} />}
    </StdinContext.Consumer>
  );
};
export default UiWithStdin;
