import init, { add } from '@rust/sample-module';


(async () => {
    await init();

    console.log(`2 + 2 = ${add(2, 2)}`);

})();
