#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import Ui from './Ui';
const cli = meow(
  `  Usage
      $ generate`
);

render(<Ui />, {
  exitOnCtrlC: false
});
