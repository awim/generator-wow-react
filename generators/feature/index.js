"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");
const { depascalize, pascalize, camelize } = require("@v-lab/xcase");
const pluralize = require("pluralize-esm");
const { replaceNonWordCharacters } = require("../../utils/wow-helper");

module.exports = class extends Generator {
  _generateDestination() {
    const { name, path } = this.options;
    if (path === "") return name;
    return `${path}/${name}`;
  }

  constructor(args, opts) {
    super(args, opts);
    this.log("Yeoman generator-wow-react:feature");

    this.argument("name", {
      type: String,
      required: true,
      description:
        "The name of the feature. This will also be the name of the directory containing the feature folders."
    });

    this.option("folders", {
      type: String,
      default:
        this.config.get("featureGeneratedFolders") ??
        "services, components, hooks, types, utils, __tests__",
      description: "List folders to be generated in the feature directory"
    });

    this.option("path", {
      type: String,
      default: this.config.get("featureDirPath") ?? "src/app/features",
      description: "Path where the feature directory will be created"
    });

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
    this.path = this.options.path;
    this.folders = this.options.folders;
  }

  async prompting() {
    this.input = await this.prompt([
      {
        type: "confirm",
        name: "withComponent",
        message: "Would you like to generate the component as well?"
      }
    ]);
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
    // Create feature directory
    this.destinationRoot(this._generateDestination());
    const pascalFeatureName = pascalize(replaceNonWordCharacters(this.name));

    // Write feature export file
    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts")
    );

    // Generate default feature sub-directories
    this.folders.split(",").forEach(dir => {
      const folder = dir.trim();
      const sourceCopy = folder => {
        switch (folder) {
          case "services":
            return "index.f.ts";
          case "hooks":
            return "index.hook.ts";
          case "types":
            return "index.type.ts";
          default:
            return "";
        }
      };

      if (sourceCopy(folder).length > 1) {
        const indexSubdir = `${folder}/${depascalize(
          this.name,
          "-"
        )}.${pluralize.singular(folder)}.ts`;

        this.fs.copyTpl(
          this.templatePath(sourceCopy(folder)),
          this.destinationPath(indexSubdir),
          {
            feature: this.name,
            project: this.project,
            filename: `${folder}/${depascalize(this.name, "-")}.${folder}`,
            componentName: pascalFeatureName,
            className: pascalFeatureName + pascalize(pluralize.singular(folder)),
            defaultFunction: camelize(pascalFeatureName) + pascalize(pluralize.singular(folder))
          }
        );

        this.fs.append(
          this.destinationPath("index.ts"),
          `export * from './${folder}/${depascalize(
            this.name,
            "-"
          )}.${pluralize.singular(folder)}';`
        );
      }
    });

    if (this.input.withComponent) {
      this.log(
        `generate ${
          this.options.name
        } on ${this._generateDestination()}/components`
      );
      this.composeWith("wow-react:component", {
        arguments: [this.options.name],
        path: `${this.destinationPath("components")}`
      });
    }
  }

  end() {
    const outputMsg = `\nYour feature ${this.name} has been created.`;
    this.log(outputMsg);
  }
};
