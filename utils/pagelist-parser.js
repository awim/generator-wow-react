const fs = require("fs");
const csvParser = require("csv-parser");

const csvFilePath = process.cwd() + "/pagelist.csv";
const jsonFolderPath = process.cwd();

const csvParserOpts = {
  separator: ";",
  // Headers: ["id", "context", "url", "label", "icon"],
  mapHeaders: ({ header }) => header.toLowerCase()
  // SkipLines: 1
};

const generateMenu = data => {
  const menuData = {};

  // eslint-disable-next-line no-unused-vars
  for (const { id, context, url, label, icon } of data) {
    const fullUrl = `/${context}${url}`;
    const parentUrl = fullUrl.slice(0, fullUrl.lastIndexOf("/"));
    const iconToUse = icon ?? ""; // Replace 'default-icon' with the actual default icon or an empty string

    if (!menuData[parentUrl]) {
      menuData[parentUrl] = {
        label: "",
        icon: iconToUse,
        to: parentUrl,
        items: []
      };
    }

    menuData[fullUrl] = { label, icon: iconToUse, to: fullUrl, items: [] };
    menuData[parentUrl].items.push(menuData[fullUrl]);
  }

  return Object.values(menuData).filter(
    menu => menu.to === `/${menu.to.split("/")[1]}`
  );
};

const writeMenuJson = (contextName, results) => {
  const menu = generateMenu(results);
  const menuJsonFilePath = `${jsonFolderPath}/menu-${contextName}.json`;
  fs.writeFileSync(menuJsonFilePath, JSON.stringify(menu[0].items, null, 2));
  console.log(`Menu JSON file saved at ${menuJsonFilePath}`);
};

export const readCSVAndSaveAsJSON = () => {
  let results = [];
  let lastContext;
  let contextName;

  fs.createReadStream(csvFilePath)
    .pipe(csvParser({ ...csvParserOpts }))
    .on("data", row => {
      contextName = row.context;
      if (!lastContext) lastContext = contextName;
      if (lastContext !== contextName) {
        writeMenuJson(lastContext, results);
        lastContext = contextName;
        results = []; // Clear result when context changed/moved
      }

      results.push(row);
    })
    .on("end", () => {
      writeMenuJson(lastContext, results); // Write the last context
      console.log("Read file stream has been ended");
    })
    .on("close", () => {
      console.log("Read file stream has been closed");
    });
};
