import path from 'node:path';
import { emptyDir } from 'fs-extra';

const TASK_NAME = 'clean';

async function cleanBundlesDirectory() {
	const folderName = 'bundles';
	const bundlesPath = path.resolve('./' + folderName);
	// Recall: Delete directory contents. Create directory if not exist.
	await emptyDir(bundlesPath);
}

/**
 * @param {{taskName: string}} cleanParam
 */
async function clean({ taskName }) {
	console.log(`Starting task "${taskName}"...`);
	const timerLabel = `Finished task "${taskName}"`;
	// console.log('');
	console.time(timerLabel);
	await cleanBundlesDirectory();
	console.timeEnd(timerLabel);
}

clean({ taskName: TASK_NAME });
