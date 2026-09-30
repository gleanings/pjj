import { dirname } from 'node:path';
import { isNull } from '@vvi/is';
import { pathJoin, getPackageJsonSync, writeJsonFileSync } from '@vvi/node';

const packageJsonResponse = getPackageJsonSync();

if (isNull(packageJsonResponse)) {
  throw new RangeError('未能识别配置文件 package.json');
}

let packageJson = packageJsonResponse.content;
let dependencies = packageJson.dependencies;
[
  'scripts',
  'devDependencies',
  'lint-staged',
  'private',
  'dependencies',
  'packageManager',
].forEach(key => delete packageJson[key]);

packageJson = {
  ...packageJson,
  author: {
    name: '泥豆君',
    email: 'Mr.MudBean@outlook.com',
    url: 'https://mudbean.cn',
  },
  description:
    "禁止在项目的根目录执行 npm publish，防止意外发布。该脚本命令需在 'prepublishOnly' 钩子中配置",
  license: 'MIT',
  files: [
    'bin.js',
    'LICENSE',
    'README.md',
    'THIRD-PARTY-LICENSES.txt',
    'CHANGELOG.md',
  ],
  keywords: ['pjj', 'mudbean', 'vvi'],
  homepage: 'https://npms.gleanings.cn/pjj',
  dependencies,
  bugs: {
    url: 'https://github.com/gleanings/pjj/issues',
    email: 'Mr.MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/gleanings/pjj.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    pjj: 'bin.js',
  },
  engines: {
    // 新增：声明 Node.js 兼容版本
    node: '>=18.0.0',
  },
};

// 写入 dist/package.json
{
  writeJsonFileSync(
    pathJoin(dirname(packageJsonResponse.path), './dist/package.json'),
    packageJson,
  );
}
