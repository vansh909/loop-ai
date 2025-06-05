let queue = [];

function addToQueue(job) {
  queue.push({ ...job, time: Date.now() });
}

function getNextJob() {
  if (queue.length === 0) return null;
  const priorityValue = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  queue.sort((a, b) => {
    if (priorityValue[b.priority] !== priorityValue[a.priority]) {
      return priorityValue[b.priority] - priorityValue[a.priority];
    }
    return a.time - b.time;
  });
  return queue.shift();
}

module.exports = { addToQueue, getNextJob };
