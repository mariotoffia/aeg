#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkopaStack } from '../lib/cdkopa-stack';

const app = new cdk.App();
new CdkopaStack(app, 'CdkopaStack', { 
    env: { 
      account: process.env.CDK_DEFAULT_ACCOUNT, 
      region: process.env.CDK_DEFAULT_REGION 
  }});
