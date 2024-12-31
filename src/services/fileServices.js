const axios = require('axios')
const { getCache, setCache } = require('./api/cache')

require('dotenv').config()

const FILE_SERVICES_API_URL = process.env.FILE_SERVICES_API_URL
const FILE_SERVICES_API_KEY = process.env.FILE_SERVICES_API_KEY

const axiosInstance = axios.create({
  baseURL: FILE_SERVICES_API_URL,
  headers: {
    Authorization: `Bearer ${FILE_SERVICES_API_KEY}`
  },
  timeout: 5000
})

const getFile = async (fileName) => {
  const cacheKey = `get-${fileName}-file`

  const cachedData = getCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await axiosInstance.get(`secret/file/${fileName}`)
    const data = response.data

    setCache(cacheKey, data)

    return data
  } catch (error) {
    console.error('Error fetching file:', error.response ? error.response.data : error.message)
    return null
  }
}

const getFiles = async (fileName) => {
  const cacheKey = `get-${fileName}-files`

  const cachedData = getCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await axiosInstance.get(`secret/files`)
    const data = response.data

    setCache(cacheKey, data)

    return data
  } catch (error) {
    console.error('Error fetching file:', error.response ? error.response.data : error.message)
    throw error
  }
}

const formatFiles = async (files) => {
  if (!Array.isArray(files)) {
    throw new Error('Invalid input: files must be an array.');
  }

  const formattedData = [];

  for (const fileContent of files) {
    if (typeof fileContent !== 'string' || !fileContent.trim()) {
      console.warn('Skipping invalid or empty file content.');
      continue;
    }

    const lines = fileContent.split('\n').map((line) => line.trim());
    const header = lines.shift();

    if (!header || header !== 'file,text,number,hex') {
      console.warn(`Skipping file with invalid header: ${header}`);
      continue;
    }

    const fileName = lines[0]?.split(',')[0];
    if (!fileName) {
      console.warn('Skipping file with missing file name.');
      continue;
    }

    const validLines = lines.filter((line) => {
      const columns = line.split(',');
      if (columns.length !== 4) {
        console.warn(`Invalid line format in file ${fileName}: ${line}`);
        return false;
      }

      const [currentFileName, text, number, hex] = columns;

      if (
        currentFileName !== fileName ||
        !text ||
        isNaN(Number(number)) ||
        !/^[a-f0-9]{32}$/.test(hex)
      ) {
        console.warn(`Invalid data in file ${fileName}: ${line}`);
        return false;
      }

      return true;
    });

    if (validLines.length === 0) {
      console.warn(`The file ${fileName} contains no valid lines after processing.`);
      continue;
    }

    const formattedLines = validLines.map((line) => {
      const [, text, number, hex] = line.split(',');
      return {
        text,
        number: Number(number),
        hex,
      };
    });

    formattedData.push({
      file: fileName,
      lines: formattedLines,
    });
  }

  return formattedData;
};

const processSingleFile = async (fileName) => {
  try {
    const fileContent = await getFile(fileName)
    const formattedFile = await formatFiles([fileContent])
    return { file: fileName, lines: formattedFile }
  } catch (error) {
    console.error(`Error processing file ${fileName}: ${error.message}`)
    throw error
  }
}

const processAllFiles = async () => {
  try {
    const data = await getFiles()
    const files = data.files.map((file) => getFile(file))

    const unformattedFiles = await Promise.all(files)

    const validFiles = unformattedFiles.filter((file) => file !== null);

    const formattedFiles = await formatFiles(validFiles)
    return formattedFiles
  } catch (error) {
    console.error('Error processing all files:', error.message)
    throw error
  }
}

const listFormattedFiles = async (fileName) => {
  const cacheKey = fileName || 'list-formatted-files'

  const cachedData = getCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    if (fileName) {
      const formattedFile = await processSingleFile(fileName)
      setCache(cacheKey, formattedFile)
      return formattedFile
    }

    const formattedFiles = await processAllFiles()
    setCache(cacheKey, formattedFiles)
    return formattedFiles
  } catch (error) {
    console.error('Error processing files:', error.response ? error.response.data : error.message)
    throw error
  }
}

const listUnformattedFiles = async () => {
  const cacheKey = 'list-unformatted-files'

  const cachedData = getCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    
    const unformattedFiles = await getFiles();
    setCache(cacheKey, unformattedFiles)

    return unformattedFiles
  } catch (error) {
    console.error('Error processing files:', error.response ? error.response.data : error.message)
    throw error
  }
}

module.exports = {
  listFormattedFiles,
  listUnformattedFiles
}
