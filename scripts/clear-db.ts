import dataSource from '../ormconfig';

async function main() {
  const ds = await dataSource.initialize();
  try {
    await ds.query('TRUNCATE TABLE fights, rankings, events, fighters RESTART IDENTITY CASCADE');
    console.log('Database tables truncated.');
  } finally {
    await ds.destroy();
  }
}

main().catch((error) => {
  console.error('Failed to truncate tables:', error);
  process.exitCode = 1;
});
