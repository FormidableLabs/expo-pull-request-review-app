import {
    readPackageJSON,
    getExpPublishName,
    writePackageJSON,
    readAppJSON,
    writeAppJSON
} from './utils';
import config from './config';

export default function preDeploy() {
  const pkg = readPackageJSON();
  const name = getExpPublishName(pkg.name, config.githubSourceBranch);
  const modified = Object.assign({}, pkg, {
    name,
    privacy: 'unlisted'
  });

  writePackageJSON(modified);

  let app = readAppJSON();
  if (app.expo) {
    app.expo = { ...app.expo,
      name,
      slug: name,
      privacy: 'unlisted'
    };
  } else {
    app = { ...app,
      name,
      slug: name,
      privacy: 'unlisted'
    };
  }

  writeAppJSON(app);
}
