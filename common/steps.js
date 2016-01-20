/**
 * Calculate the recommended amount of steps for the current day, based on the steps
 * collected from previous days.
 *
 * This function expects a map like this:
 *
 * {"2015-06-01":20,"2015-06-02":100,...}
 *
 * So you map dates (as reported from fitbit) to the steps on that day. It's okay to
 * have gaps in the dates, as long as the map contains AT LEAST TWO dates. At most,
 * four dates are considered. The order of the map doesn't matter, proper sorting
 * is applied within this function.
 *
 * This function does not check if dates are in the future. It is the caller's
 * responsibility to give the correct date range to make recommendations for the
 * expected day.
 *
 * @param  {object} lastSteps  map from dates to steps
 * @return {int}               recommended number of steps
 */
function calcStepRecommendation(lastSteps, weightA, weightB, boost) {
	var steps = convertToDateStepList(lastSteps);

	// we need at least two existing data points to calculate something meaningful
	if (steps.length < 2) {
		return -1;
	}

	weightA = weightA || 1;
	weightB = weightB || 1;
	boost   = boost || 1;

	// calculation is always based on the last four days at most
	steps = steps.slice(0, 4);

	var size    = steps.length;
	var oldest  = steps[size-1];
	var recent  = steps[0];
	var average = steps.reduce(function(acc, n) { return acc + n.steps; }, 0) / size;

	// To calculate the trend, we need to know how far the most recent and oldest
	// datapoints are away from each other, days-wise.
	var distance = getDayDistance(oldest.date, recent.date);

	// Now we can calculate the trend.
	var trend = recent.steps + ((recent.steps - oldest.steps) / distance);

	// weight the values
	var weightedAverage = weightA * average;
	var weightedTrend   = weightB * trend;

	// finally
	var recommendation = (1 / (weightA + weightB)) * (weightedAverage + weightedTrend);

	// give it one last touch
	recommendation *= boost;

	// round up
	recommendation = Math.round(recommendation);

	// for very active people, the recommendation should never exceed 25k steps
	if (recommendation > 25000) {
		recommendation = 25000;
	}

	return recommendation;
}

function parseDate(d) {
	// force to 00:00:00 to avoid accidentally ticking one second during calculations
	return parseInt((new Date(d + " 00:00:00")).getTime() / 1000, 10);
}

function getDayDistance(dateA, dateB) {
	if (dateB < dateA) {
		var tmp = dateA;
		dateA = dateB;
		dateB = tmp;
	}

	var distance   = 0;
	var oldestDate = parseDate(dateA);
	var recentDate = parseDate(dateB);
	var cursor     = oldestDate;
	var oneDay     = 24*3600;

	for (;;) {
		if (cursor >= recentDate) {
			break;
		}

		distance++;
		cursor += oneDay;
	}

	return distance;
}

function convertToDateStepList(stepMap) {
	// turn into flat array
	var stepList = [];

	for (var date in stepMap) {
		if (stepMap.hasOwnProperty(date)) {
			// we only takes days with activity into consideration
			if (stepMap[date] > 0) {
				stepList.push({
					date:  date,
					steps: stepMap[date],
				});
			}
		}
	}

	// now sort the list in descending order
	stepList.sort(function(a, b) {
		if (a.date < b.date) {
			return 1;
		}

		if (a.date > b.date) {
			return -1;
		}

		return 0;
	});

	return stepList;
}

function test() {
	var datasets = [
		[[5000, 12500, 7500, 10000],                                                                                                                                      10403],
		[[5000, 12500, 7500, 10000, 9500],                                                                                                                                10076],
		[[5000, 12500, 7500, 10000, 9500, 9000],                                                                                                                          9808],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500],                                                                                                                    9452],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000],                                                                                                              8917],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500],                                                                                                        8382],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000],                                                                                                  7847],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000],                                                                                            7639],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000],                                                                                      7520],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000],                                                                                8144],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500],                                                                          8649],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000],                                                                   9898],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500],                                                             9987],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000],                                                       9868],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000],                                                 9779],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000],                                           9660],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500],                                     9957],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000],                               9065],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000, 8000],                         8887],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000, 8000, 7000],                   7995],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000, 8000, 7000, 6000],             7074],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000, 8000, 7000, 6000, 5000],       6063],
		[[5000, 12500, 7500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 7000, 7000, 8000, 8500, 10000, 9500, 9000, 9000, 9000, 9500, 8000, 8000, 7000, 6000, 5000, 8500], 7936],
	];

	var weightA = 2;
	var weightB = 1;
	var boost   = 1.07;

	for (var idx = 0; idx < datasets.length; ++idx) {
		var dataset = datasets[idx];
		var input   = {};

		for (var i = 0; i < dataset[0].length; ++i) {
			var thisDate = new Date(2015, 7, i);

			input[thisDate.toISOString().substring(0, 10)] = dataset[0][i];
		}

		var recommendation = calcStepRecommendation(input, weightA, weightB, boost);

		if (recommendation !== dataset[1]) {
			console.log("FAIL: expected", dataset[1], "but got", recommendation);
			console.log(input);
		}
		else {
			console.log("  OK:", recommendation);
		}
	}
}

// test();

module.exports = {
	calcStepRecommendation: calcStepRecommendation
};
