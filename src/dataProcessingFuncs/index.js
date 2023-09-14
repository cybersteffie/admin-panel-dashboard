export function rangeLists(data) {
  let uniqueRanges = {};
  data.forEach((d) => {
    if (uniqueRanges[d.range_name] === undefined) {
      uniqueRanges[d.range_name] = 1;
    }
  });

  return Object.keys(uniqueRanges).sort();
}

export function rangesCompletedvsPartialDonutall(data) {
  let uniqueRangesGoals = {},
    uniqueStudents = {};
  data.forEach((d) => {
    if (uniqueRangesGoals[d.range_id] === undefined) {
      uniqueRangesGoals[d.range_id] = d.total_flags;
    }
  });

  data.forEach((d) => {
    if (uniqueStudents[d.user_id] === undefined) {
      uniqueStudents[d.user_id] = {};
      uniqueStudents[d.user_id][d.range_id] = {};
      if (d.completion_status === "C") {
        uniqueStudents[d.user_id][d.range_id][d.goal_id] = 1;
      }
    } else {
      if (uniqueStudents[d.user_id][d.range_id] === undefined) {
        uniqueStudents[d.user_id][d.range_id] = {};
        if (d.completion_status === "C") {
          uniqueStudents[d.user_id][d.range_id][d.goal_id] = 1;
        }
      } else if (
        uniqueStudents[d.user_id][d.range_id][d.goal_id] === undefined
      ) {
        if (d.completion_status === "C") {
          uniqueStudents[d.user_id][d.range_id][d.goal_id] = 1;
        }
      }
    }
  });
}

export function rangesCompletedvsPartialDonut(data, id) {
  let uniqueRangesGoals = {},
    uniqueStudents = {},
    totalUniqueStudents = {},
    total_flags;
  let complete = 0,
    partial = 0;

  let last_goal = {};
  data.forEach((d) => {
    if (totalUniqueStudents[d.user_id] == undefined) {
      totalUniqueStudents[d.user_id] = 1;
    }
    if (uniqueRangesGoals[id] === undefined) {
      uniqueRangesGoals[id] = d.total_flags;
      total_flags = d.total_flags;
    }
    if (d.range_name.localeCompare(id) === 0) {
      if (d.FinalGoal === "T") {
        if (last_goal[d.user_id] === undefined) {
          last_goal[d.user_id] = 1;
        }
      }
      if (uniqueStudents[d.user_id] === undefined) {
        uniqueStudents[d.user_id] = {};
        if (d.completion_status === "C") {
          uniqueStudents[d.user_id][d.goal_id] = 1;
        }
      } else {
        if (uniqueStudents[d.user_id][d.goal_id] === undefined) {
          if (d.completion_status === "C") {
            uniqueStudents[d.user_id][d.goal_id] = 1;
          }
        }
      }
    }
  });

  Object.keys(uniqueStudents).forEach((d) => {
    if (last_goal[d] !== "undefined" && last_goal[d] === 1) {
      complete++;
    } else if (Object.keys(uniqueStudents[d]).length === total_flags) {
      complete++;
    } else {
      partial++;
    }
  });

  return [
    complete,
    partial,
    Object.keys(totalUniqueStudents).length - (complete + partial),
  ];
}

export function stackedBar(data, id) {
  let uniqueGoals = {},
    completed = [],
    partial = [],
    labels = [],
    hints = [];

  data.forEach((d) => {
    if (d.range_name.localeCompare(id) === 0) {
      if (uniqueGoals[d.goal_id] === undefined) {
        if (d.completion_status === "C") {
          uniqueGoals[d.goal_id] = { completed: 1, partial: 0, hints_used: d.hints_used || 0 };
        } else {
          uniqueGoals[d.goal_id] = { completed: 0, partial: 1, hints_used: d.hints_used || 0 };
        }
      } else {
        if (d.completion_status === "C") {
          uniqueGoals[d.goal_id]["completed"] = uniqueGoals[d.goal_id]["completed"] + 1;
        } else {
          uniqueGoals[d.goal_id]["partial"] = uniqueGoals[d.goal_id]["partial"] + 1;
        }
        // Assuming you want to accumulate hints for a goal if it appears multiple times in the dataset
        uniqueGoals[d.goal_id]["hints_used"] += (d.hints_used || 0);
      }
    }
  });

  Object.keys(uniqueGoals).forEach((d, index) => {
    let count = index + 1;  // counting starts from 1
    completed.push(uniqueGoals[d].completed);
    partial.push(uniqueGoals[d].partial);
    labels.push("Goal " + count);
    hints.push(uniqueGoals[d].hints_used);
  });

  return { labels: labels, completed: completed, partial: partial, hints: hints };
}