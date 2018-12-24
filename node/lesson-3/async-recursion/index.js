'use strict';

const getSentenceFragment = (offset = 0) => {
  const pageSize = 3;
  const sentence = [...'hello world'];
  return {
    data: sentence.slice(offset, offset + pageSize),
    nextPage: offset +
      pageSize < sentence.length ? offset + pageSize : undefined,
  };
};

const getSentenceFragmentAsync = (offset, callback) => {
  const pageSize = 3;
  const sentence = [...'hello world'];
  setTimeout(() => callback({
    data: sentence.slice(offset, offset + pageSize),
    nextPage: offset +
      pageSize < sentence.length ? offset + pageSize : undefined
  }), 500);
};

const getSentenceRec = (offset = 0) => {
  const fragment = getSentenceFragment(offset);
  if (fragment.nextPage) {
    return fragment.data.concat(getSentenceRec(fragment.nextPage));
  } else {
    return fragment.data;
  }
};

const getSentence = () => {
  let offset = 0,
    aggregateData = [];
  
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const fragment = getSentenceFragment(offset);
    aggregateData = aggregateData.concat(fragment.data);
    if (fragment.nextPage) {
      offset = fragment.nextPage;
    } else {
      break;
    }
  }
  return aggregateData;
};

const getSentenceAsync = (offset, callback) => {
  getSentenceFragmentAsync(offset, (fragment) => {
    if (fragment.nextPage) {
      // ...
    } else {
      callback(fragment.data);
    }
  });
};


module.exports = {
  getSentenceFragment,
  getSentenceFragmentAsync,
  getSentence,
  getSentenceRec,
};