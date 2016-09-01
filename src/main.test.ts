// Import mocha typings.
import "mocha";

// Load all spec files
interface IWebpackRequire {
    context(file: string, flag?: boolean, exp?: RegExp): any;
}
// const testsContext = (<any> require as IWebpackRequire).context(".", true, /.+\.spec\.ts$/);
//
// testsContext.keys().forEach(testsContext);

// make sure that all .ts files will be processed by webpack
const codeContext = (<any> require as IWebpackRequire).context(".", true, /.+\.ts$/);
codeContext.keys().forEach((file) => {
    // And require all spec files to run them.
    if ( file.indexOf(".spec.ts") !== -1 ) {
        codeContext(file);
    }
});
