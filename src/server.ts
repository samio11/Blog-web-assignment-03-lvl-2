import app from './app';
import mongoose from 'mongoose';
import config from './config';

async function main() {
  await mongoose.connect(config.database as string);
  app.listen(config.port, () => {
    console.log(`Server is running on:- ${config.port}`);
  });
}
main();
