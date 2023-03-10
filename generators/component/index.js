"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");
const { depascalize, decamelize } = require("xcase");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Creating component...");

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

    this.option("storybook", {
      type: Boolean,
      default: true,
      description:
        "Add a 'story' directory in the component folder with some boilerplate for @storybook/react"
    });

    this.option("test", {
      type: Boolean,
      default: true,
      description:
        "Adds a __tests__ directory in the component folder with some boilerplate for @testing-library/react."
    });

    this.option("path", {
      type: String,
      default: "src/ui/components",
      description: "Path where the component directory will be created"
    });

    this.getCssClassName = function(name) {
      return decamelize(name, { separator: "-" });
    };

    this.generateDestination = function() {
      const { path, name, type } = this.options;
      if (path === "" && type === "") return name;
      if (path !== "" && type === "") return path + "/" + name;
      if (path === "" && type !== "") return path + "/" + name;
      return path + "/" + type + "/" + name;
    };

    this.name = this.options.name;
    this.type = this.options.type;
    this.project = this.options.project;
    this.storybook = this.options.storybook;
    this.test = this.options.test;
    this.className = depascalize(this.options.name, "-");
  }

  writing() {
    // Create component directory
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
        className: this.className
      }
    );

    // Write component helper file
    this.fs.copyTpl(
      this.templatePath("component.helper.ts"),
      this.destinationPath(this.name + "Helper.ts"),
      {
        name: this.name
      }
    );

    // Write story file
    if (this.storybook) {
      this.fs.copyTpl(
        this.templatePath("component.story.tsx"),
        this.destinationPath("story/", this.name + ".story.tsx"),
        {
          name: this.name,
          project: this.project
        }
      );

      // Write story docs file
      this.fs.copyTpl(
        this.templatePath("component.story.mdx"),
        this.destinationPath("story/", this.name + ".story.mdx"),
        {
          name: this.name,
          project: this.project
        }
      );
    }

    // If test flag, write test files
    if (this.test) {
      this.fs.copyTpl(
        this.templatePath("component.test.tsx"),
        this.destinationPath("__tests__/", this.name + ".test.tsx"),
        {
          name: this.name
        }
      );
    }

    // Write component export file
    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts"),
      {
        name: this.name,
        className: this.className
      }
    );
  }

  end() {
    const outputMsg = `\n\nYour React TSX component ${this.name} ${
      this.type ? "with " + this.type : ""
    } has been created.`;
    this.log(yosay(outputMsg));
  }
};
