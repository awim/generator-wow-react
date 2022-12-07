"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");
const mkdirp = require("mkdirp");
const { depascalize, pascalize, camelize } = require("xcase");
const { singular } = require("pluralize");

module.exports = class extends Generator {
  _generateDestination() {
    const { name, path } = this.options;
    if (path === "") return name;
    return `${path}/${name}`;
  }

  constructor(args, opts) {
    super(args, opts);
    this.log("Creating feature...");

    this.argument("name", {
      type: String,
      required: true,
      description:
        "The name of the feature. This will also be the name of the directory containing the feature folders."
    });

    this.option("folders", {
      type: String,
      default: "services, components, hooks, types, utils, __tests__",
      description: "List folders to be generated in the feature directory"
    });

    this.option("path", {
      type: String,
      default: "src/features",
      description: "Path where the feature directory will be created"
    });

    this.option("recursive", {
      type: Boolean,
      default: false,
      description: "Duplicate path folder inside feature directory"
    });

    this.name = this.options.name;
    this.path = this.options.path;
    this.folders = this.options.folders;
  }

  initializing() {
    this.log(
      `generate ${
        this.options.name
      } on ${this._generateDestination()}/components`
    );
    this.composeWith("wow-react:component", {
      arguments: [this.options.name],
      path: "components"
    });
  }

  writing() {
    // Create feature directory
    this.destinationRoot(this._generateDestination());

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

      mkdirp.sync(`${folder}`);

      if (sourceCopy(folder).length > 1) {
        const indexSubdir = `${folder}/${depascalize(
          this.name,
          "-"
        )}.${singular(folder)}.ts`;

        this.fs.copyTpl(
          this.templatePath(sourceCopy(folder)),
          this.destinationPath(indexSubdir),
          {
            feature: this.name,
            project: this.project,
            filename: `${folder}/${depascalize(this.name, "-")}.${folder}`,
            className: pascalize(this.name) + pascalize(singular(folder)),
            defaultFunction: camelize(depascalize(this.name, "_"))
          }
        );

        this.fs.append(
          this.destinationPath("index.ts"),
          `export * from './${folder}/${depascalize(this.name, "-")}.${singular(
            folder
          )}';`
        );
      }
    });
  }

  end() {
    const outputMsg = `\n\nYour feature ${this.name} has been created.`;
    this.log(yosay(outputMsg));
  }
};
