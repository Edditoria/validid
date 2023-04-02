import { deleteAsync } from 'del';

const dryRun = false;
const showDetails = true;
const taskName = 'clean';
const delGlobs = ['bundles/**'];

async function main() {
	console.log(`Starting task "${taskName}"...`);
	const timerLabel = `Finished task "${taskName}"`;
	if (dryRun === true) {
		console.log('(Note: Try-run is enabled.)');
	}
	console.log('');
	console.time(timerLabel);

	const deletedPaths = await deleteAsync(delGlobs, { dryRun: dryRun });

	if (showDetails === true) {
		console.log('Deleted files:');
		console.log(deletedPaths.join('\n') || '(none)');
		console.log('');
	}

	console.timeEnd(timerLabel);
}
main();
