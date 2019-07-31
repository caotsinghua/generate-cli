#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import Ui from './Ui';
const cli = meow(
  `  Usage
      $ emma

     Controls:
      - space: toggle dependencies
      - up/down: scroll the list
      - right/left: hide or show details
      - double right: show repo`
);

render(<Ui />, {
  exitOnCtrlC: false
});
