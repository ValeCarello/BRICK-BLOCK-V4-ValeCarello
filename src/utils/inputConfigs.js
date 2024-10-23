const defaultInputConfigs = {
    up: ['W', 'UP', "ARROWUP"],
    down: ['S', 'DOWN', "ARROWDOWN"],
    left: ['A', 'LEFT', "ARROWLEFT"],
    right: ['D', 'RIGHT', "ARROWRIGHT"],
    action: ['SPACE']
};

const ijkl = {
    up: ['I'],
    down: ['K'],
    left: ['J'],
    right: ['L'],
    action: ['SPACE']
};

const wasd = {
    up: ['W'],
    down: ['S'],
    left: ['A'],
    right: ['D'],
    action: ['SPACE']
};

const cursor = {
    up: ['UP', "ARROWUP"],
    down: ['DOWN', "ARROWDOWN"],
    left: ['LEFT', "ARROWLEFT"],
    right: ['RIGHT', "ARROWRIGHT"],
    action: ['SPACE']
};

export const inputConfigs = {
    ijkl,
    wasd,
    cursor,
    defaultInputConfigs
};