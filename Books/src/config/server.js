// Execute first in node project to start up the servers as required

export const start = () => {
    init()
    .then(app => {
        app.listen(port, () => {
            let server = (env === "secure" ? "https://" : "http://")
            console.log(chalk.green(`Dev server started on ${port}`));
        });

    })
    .catch(err => {
        console.error(err);
    });
};

module.exports = start();