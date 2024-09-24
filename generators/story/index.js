"use strict";

const path = require('path');
const Generator = require("yeoman-generator");
const { pascalize, decamelize } = require("@v-lab/xcase");
const { replaceNonWordCharacters, toPosixPath } = require("../../utils/wow-helper");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Yeoman generator-wow-react:story");

    this.argument("name", {
      type: String,
      required: true,
      description: "Set your component's name"
    });

    this.argument("componentpath", {
      type: String,      
      required: true,
      description: "Component path where the component directory is available"
    });

    this.option("project", {
      type: String,
      default: this.appname,
      description: "Set your project name for storybook"
    });

    this.option("type", {
      type: String,
      default: "",
      description: "Set your component's type"
    });

    this.option("storypath", {
      type: String,
      default: this.config.get("storyFolder") ?? "src/stories/",
      description:
        "Set directory location of generated '*.stories.tsx' of the components"
    });

    this.option("path", {
      type: String,
      default:
        this.config.get("componentGeneratedDirPath") ?? "src/app/components",
      description: "Path where the component directory will be created"
    });

    this.getCssClassName = function(name) {
      return decamelize(name, { separator: "-" });
    };

    this.generateName = function() {
      if (this.options.name.split("/").length === 1) {
        this.getName = this.options.name;
        return this.getName;
      }

      if (this.options.name.split("/").length > 1) {
        let tempName = this.options.name.split("/");
        this.getName = tempName[1];
        return this.getName;
      }
    };

    this.name = this.generateName();
    this.componentpath = this.options.componentpath;
    this.path = this.options.path;
    this.type = this.options.type;
    this.project = this.options.project;
    this.helper = this.options.helper;
    this.storybook = true;
    this.storypath = this.options.storypath;
  }

  initializing() {
    this.config.defaults({
      featureDirPath: "src/app/modules",
      featureGeneratedFolders:
        "services, components, hooks, types, utils, __tests__",
      componentGeneratedDirPath: "src/app/components",
      generateTestComponent: false,
      generateHelperComponent: false,
      generateStorybookComponent: false,
      storyFolder: "src/stories/"
    });
  }

  writing() {
    this.destinationRoot(this.storypath);
    
    const ComponentName = pascalize(replaceNonWordCharacters(this.name));
    const from = toPosixPath(path.resolve(this.destinationPath()));
    const to = toPosixPath(path.resolve(this.componentpath));
    const relativePath = path.relative(from, to);
    this.log('relativePath', relativePath, from, to);

    // Write story file
    if (this.storybook) {      
      this.fs.copyTpl(
        this.templatePath("component.stories.tsx"),
        this.destinationPath(`${this.name}.stories.tsx`),
        {
          name: this.name,
          componentName: ComponentName,
          relativePath: toPosixPath(relativePath),
          project: this.project
        }
      );
    }
  }

  end() {
    const outputMsg = `\nYour storybook component ${this.name} ${
      this.type ? "with " + this.type : ""
    } has been created.`;
    this.log(outputMsg);
  }
};
