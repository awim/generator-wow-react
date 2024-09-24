"use strict";

const Generator = require("yeoman-generator");
const { pascalize, depascalize, decamelize } = require("@v-lab/xcase");
const { replaceNonWordCharacters } = require("../../utils/wow-helper");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Yeoman generator-wow-react:component");

    this.argument("name", {
      type: String,
      required: true,
      description: "Set your component's name"
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

    this.option("helper", {
      type: Boolean,
      default: this.config.get("generateHelperComponent") ?? false,
      description:
        "Create a 'helper' component to facilitate event handler in components"
    });

    this.option("storybook", {
      type: Boolean,
      default: this.config.get("generateStorybookComponent") ?? false,
      description:
        "Add a 'story' directory in the component folder with some boilerplate for @storybook/react"
    });

    this.option("storypath", {
      type: String,
      default: this.config.get("storyFolder") ?? "src/stories/",
      description:
        "Set directory location of generated '*.stories.tsx' of the components"
    });

    this.option("test", {
      type: Boolean,
      default: this.config.get("generateTestComponent") ?? true,
      description:
        "Adds a __tests__ directory in the component folder with some boilerplate for @testing-library/react."
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

    this.generateDestination = function() {
      const { path, name, type } = this.options;
      const parseName = name.replace('.', '-');
      if (path === "" && type === "") return parseName;
      if (path !== "" && type === "") return path + "/" + parseName;
      if (path === "" && type !== "") return type + "/" + parseName;
      return path + "/" + type + "/" + parseName;
    };

    this.generateName = function() {
      if (this.options.name.split("/").length === 1) {
        this.getName = this.options.name;
        return this.getName;
      }

      if (this.options.name.split("/").length > 1) {
        let tempName = this.options.name.split("/");
        this.getName = tempName[tempName.length - 1];
        return this.getName;
      }
    };

    this.name = this.generateName();
    this.path = this.options.path;
    this.type = this.options.type;
    this.project = this.options.project;
    this.helper = this.options.helper;
    this.storybook = this.options.storybook;
    this.storypath = this.options.storypath;
    this.test = this.options.test;
    this.className = depascalize(this.generateName(), "-");
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
    // Create component directory
    const ComponentName = pascalize(replaceNonWordCharacters(this.name));
    this.destinationRoot(this.generateDestination());

    // Write css file
    this.fs.copyTpl(
      this.templatePath("component.module.scss"),
      this.destinationPath(this.name + ".module.scss"),
      {
        className: this.className
      }
    );

    // Write component file
    this.fs.copyTpl(
      this.templatePath("component.tsx"),
      this.destinationPath(this.name + ".tsx"),
      {
        name: this.name,
        componentName: ComponentName,
        className: this.className
      }
    );

    // Write component helper file
    if (this.helper) {
      this.fs.copyTpl(
        this.templatePath("component.helper.ts"),
        this.destinationPath(this.name + ".helper.ts"),
        {
          name: this.name,
          componentName: ComponentName,
        }
      );
    }

    // If test flag, write test files
    if (this.test) {
      this.fs.copyTpl(
        this.templatePath("component.test.tsx"),
        this.destinationPath("__tests__/", this.name + ".test.tsx"),
        {
          name: this.name,
          componentName: ComponentName,
        }
      );
    }

    // Write component export file
    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts"),
      {
        name: this.name,
        componentName: ComponentName,
        className: this.className
      }
    );

    // Write story file
    if (this.storybook) {
      this.log(
        `generate ${ this.name } story on ${this.storypath}${this.name}`
      );
      this.composeWith("wow-react:story", {
        arguments: [this.name, this.destinationPath()],
        storybook: this.storybook,
        storypath: `${this.storypath}`
      });
    }
  }

  end() {
    const outputMsg = `\nYour React TSX component ${this.name} ${
      this.type ? "with " + this.type : ""
    } has been created.`;
    this.log(outputMsg);
  }
};
