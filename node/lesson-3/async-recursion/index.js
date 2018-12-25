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

const getSentenceFragmentPromise = (offset = 0) => new Promise((resolve, reject) => {
  const pageSize = 3;
  const sentence = [...'hello world'];
  setTimeout(() => resolve({
    data: sentence.slice(offset, offset + pageSize),
    nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
  }), 500);
});

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
      // recursively call getSentenceAsync
      getSentenceAsync(fragment.nextPage, (nextFragment) => {
        callback(fragment.data.concat(nextFragment));
      });
    } else {
      callback(fragment.data);
    }
  });
};

const getSentencePromise = (offset = 0) =>
  getSentenceFragmentPromise(offset)
    .then(fragment => {
      if (fragment.nextPage) {
        return getSentencePromise(fragment.nextPage)
          .then(nextFragment => fragment.data.concat(nextFragment));
      } else {
        return fragment.data;
      }
    });

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getSentenceFragmentAsyncAwait = async function(offset = 0) {
  const pageSize = 3;
  const sentence = [...'hello world'];

  await wait(500);

  return {
    data: sentence.slice(offset, offset + pageSize),
    nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
  };
};

const getSentenceAsyncAwait = async function(offset = 0) {
  const fragment = await getSentenceFragmentAsyncAwait(offset);
  if (fragment.nextPage) {
    return fragment.data.concat(await getSentenceAsyncAwait(fragment.nextPage));
  } else {
    return fragment.data;
  }
};

module.exports = {
  getSentenceFragment,
  getSentence,
  
  getSentenceFragmentAsync,
  getSentenceAsync,
  getSentenceRec,
  
  getSentenceFragmentPromise,
  getSentencePromise,

  getSentenceFragmentAsyncAwait,
  getSentenceAsyncAwait,
};