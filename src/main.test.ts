// Import mocha typings.
import "mocha";

// Load all spec files
interface IWebpackRequire {
    context(file: string, flag?: boolean, exp?: RegExp): any;
}
const testsContext = (<any> require as IWebpackRequire).context(".", true, /.+\.spec\.ts?$/);

testsContext.keys().forEach(testsContext);
