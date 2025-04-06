import path from 'path'
import * as plop from 'plop'

const CWD = process.cwd()

/**
 * 
 * @param {plop.NodePlopAPI} plop 
 */
const plopFn = (plop) => {
  plop.setGenerator('module', {
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '✏️  请输入module 名称: '
      },
      {
        type: 'input',
        name: 'moduleNoteName',
        message: '📑  请输入module 名称注释'
      }
    ],
    actions: [
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module.ts'),
        templateFile: path.join(CWD, '.template/module/temp/temp.module.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.resolver.ts'),
        templateFile: path.join(CWD, '.template/module/temp/temp.resolver.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.service.ts'),
        templateFile: path.join(CWD, '.template/module/temp/temp.service.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.seed.ts'),
        templateFile: path.join(CWD, '.template/module/temp/temp.seed.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/entities/{{kebabCase moduleName}}.entity.ts'),
        templateFile: path.join(CWD, '.template/module/temp/entities/temp.entity.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase moduleName}}.input.ts'),
        templateFile: path.join(CWD, '.template/module/temp/dto/temp.input.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase moduleName}}.type.ts'),
        templateFile: path.join(CWD, '.template/module/temp/dto/temp.type.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/dto/{{kebabCase moduleName}}.res.type.ts'),
        templateFile: path.join(CWD, '.template/module/temp/dto/temp.res.type.hbs')
      },
      {
        type: 'add',
        path: path.join(CWD, 'src/modules/{{kebabCase moduleName}}/utils/response.ts'),
        templateFile: path.join(CWD, '.template/module/temp/utils/response.hbs')
      },
      {
        type: 'modify',
        path: path.join(CWD, './src/app.module.ts'),
        pattern: /import { Module } from '@nestjs\/common';/g,
        template: "import { Module } from '@nestjs/common';\nimport { {{pascalCase moduleName}}Module } from './modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}.module';",
      },
      {
        type: 'modify',
        path: path.join(CWD, './src/app.module.ts'),
        pattern: /imports: \[([\s\S]*?)\](?=\s*,\s*controllers)/g,
        template: 'imports: [$1  {{pascalCase moduleName}}Module,\n  ]'
      }
    ]
  })
}

export default plopFn