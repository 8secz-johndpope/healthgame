function pointsForReachedStepGoal(stepGoal) {
	if (!stepGoal) {
		return 0;
	}
	return Math.ceil(stepGoal / 85);
}

function pointsForTotalDailySteps(steps) {
	if (!steps) {
		return 0;
	}
	return Math.ceil(Math.pow(steps, 0.3) * 20);
}

function pointsForChallenges(isCreator, place, participants) {
	var points = isCreator ? 20 : 10;

	if (participants < 2) {
		throw 'This should not happen. Do not try to calculate for invalid challenges.';
	}

	if (place === 1) {
		points += 300;
	}
	else if (place === 2 && participants > 2) {
		points += 100;
	}
	else if (place === 3 && participants > 3) {
		points += 50;
	}

	return points;
}

function pointsForWeeklyGoal(totalDays, successfulDays) {
	var points = 15; // just for creating the goal itself

	if (!!successfulDays) {
		// bonus points for completing the goal
		if (successfulDays >= totalDays) {
			points += 100;
		}

		// 50 points for each successful day
		points += 50 * successfulDays;
	}

	return points;
}

function pointsForQuiz(correctAnswers, totalAnswers) {
	var points = correctAnswers * 15;

	if (correctAnswers >= (totalAnswers || 3)) {
		points += 20;
	}

	return points;
}

function pointsForCreatingHowTo() {
	return 15;
}

function pointsForRatingHowTo() {
	return 2;
}

function pointsForBestWeeklyHowTo(firstPlaces) {
	return firstPlaces > 5 ? 0 : (150 / firstPlaces);
}

function pointsForLogin() {
	return 5;
}

function test() {
	[[5436, 64], [16549, 195]].forEach(function(testcase) {
		var input = testcase[0], expected = testcase[1];

		if (pointsForReachedStepGoal(input) !== expected) {
			console.log('FAIL: pointsForReachedStepGoal(' + input + ') should be ' + expected + ', but is ' + pointsForReachedStepGoal(input));
		}
		else {
			console.log(' OK : pointsForReachedStepGoal(' + input + ') = ' + expected);
		}
	});

	[[4795, 254], [8216, 299], [16855, 371]].forEach(function(testcase) {
		var input = testcase[0], expected = testcase[1];

		if (pointsForTotalDailySteps(input) !== expected) {
			console.log('FAIL: pointsForTotalDailySteps(' + input + ') should be ' + expected + ', but is ' + pointsForTotalDailySteps(input));
		}
		else {
			console.log(' OK : pointsForTotalDailySteps(' + input + ') = ' + expected);
		}
	});

	[[true, 3, 5, 70], [false, 2, 2, 10], [false, 2, 4, 110]].forEach(function(testcase) {
		var creator = testcase[0], place = testcase[1], participants = testcase[2], expected = testcase[3];

		if (pointsForChallenges(creator, place, participants) !== expected) {
			console.log('FAIL: pointsForChallenges(' + (creator?'true':'false') + ', ' + place + ', ' + participants + ') should be ' + expected + ', but is ' + pointsForChallenges(creator, place, participants));
		}
		else {
			console.log(' OK : pointsForChallenges(' + (creator?'true':'false') + ', ' + place + ', ' + participants + ') = ' + expected);
		}
	});

	[[4, 3, 160], [5, 5, 360]].forEach(function(testcase) {
		var total = testcase[0], success = testcase[1], expected = testcase[2];

		if (pointsForWeeklyGoal(total, success) !== expected) {
			console.log('FAIL: pointsForWeeklyGoal(' + total + ', ' + success + ') should be ' + expected + ', but is ' + pointsForWeeklyGoal(total, success));
		}
		else {
			console.log(' OK : pointsForWeeklyGoal(' + total + ', ' + success + ') = ' + expected);
		}
	});

	[[2, 30], [3, 65]].forEach(function(testcase) {
		var correct = testcase[0], expected = testcase[1];

		if (pointsForQuiz(correct) !== expected) {
			console.log('FAIL: pointsForQuiz(' + correct + ') should be ' + expected + ', but is ' + pointsForQuiz(correct));
		}
		else {
			console.log(' OK : pointsForQuiz(' + correct + ') = ' + expected);
		}
	});
}

function pointsFotTipCreation() {
	return 15;
}

function pointsFotTipVote() {
	return 2;
}

function pointsFotTipWin(count) {
	// Count should contain the counter for same upvotes in one category
	return 150 / count;
}

function pointsForChallengeCreate() {
	return 20;
}

function pointsForChallengeParticipation() {
	return 10;
}

module.exports = {
	TYPE: {
		QUIZ:                   'quizPoint',
		STEP:                   'stepPoint',
		GOAL:                   'goalPoint',
		TIP:                    'tipPoint',
		TIPVOTE:                'tipVotePoint',
		TIPWIN:                 'tipWinPoint',
		CHALLENGE:              'challengePoint',
		CHALLENGECREATE:        'challengeCreatePoint',
		CHALLENGEPARTICIPATION: 'challengeParticipationPoint',
		LOGIN:                  'loginPoint'
	},
	pointsForReachedStepGoal: pointsForReachedStepGoal,
	pointsForTotalDailySteps: pointsForTotalDailySteps,
	pointsForChallenges: pointsForChallenges,
	pointsForWeeklyGoal: pointsForWeeklyGoal,
	pointsForQuiz: pointsForQuiz,
	pointsForCreatingHowTo: pointsForCreatingHowTo,
	pointsForRatingHowTo: pointsForRatingHowTo,
	pointsForBestWeeklyHowTo: pointsForBestWeeklyHowTo,
	pointsForLogin: pointsForLogin,
	pointsFotTipCreation: pointsFotTipCreation,
	pointsFotTipVote: pointsFotTipVote,
	pointsFotTipWin: pointsFotTipWin,
	pointsForChallengeCreate: pointsForChallengeCreate,
	pointsForChallengeParticipation: pointsForChallengeParticipation
};
