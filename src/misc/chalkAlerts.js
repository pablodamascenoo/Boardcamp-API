import chalk from "chalk";

export function failure(msg) {
    console.log(chalk.bold.red(msg));
}

export function warning(msg) {
    console.log(chalk.bold.yellow(msg));
}

export function success(msg) {
    console.log(chalk.bold.green(msg));
}
