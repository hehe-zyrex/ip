if (!globalThis.__visitors) globalThis.__visitors = [];

exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      all: globalThis.__visitors.slice(0, 100)
    })
  };
};
