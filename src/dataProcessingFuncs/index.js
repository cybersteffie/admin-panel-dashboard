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
    total_flags;
  let complete = 0,
    partial = 0;

  let last_goal = {};
  data.forEach((d) => {
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

  console.log("786 uniqueStudents", uniqueStudents);
  Object.keys(uniqueStudents).forEach((d) => {
    if (last_goal[d] !== "undefined" && last_goal[d] === 1) {
      complete++;
    } else if (Object.keys(uniqueStudents[d]).length === total_flags) {
      complete++;
    } else {
      partial++;
    }
  });

  return [complete, partial];
}

export function stackedBar(data, id) {
  //     let uniqueRangesGoals = {},
  //     uniqueStudents = {},
  //     total_flags;
  //   let complete = 0,
  //     partial = 0;

  let uniqueGoals = {},
    completed = [],
    partial = [],
    labels = [];

  data.forEach((d) => {
    if (d.range_name.localeCompare(id) === 0) {
      if (uniqueGoals[d.goal_id] === undefined) {
        if (d.completion_status === "C") {
          uniqueGoals[d.goal_id] = { completed: 1, partial: 0 };
        } else {
          uniqueGoals[d.goal_id] = { completed: 0, partial: 1 };
        }
      } else {
        if (d.completion_status === "C") {
          uniqueGoals[d.goal_id]["completed"] =
            uniqueGoals[d.goal_id]["completed"] + 1;
        } else {
          uniqueGoals[d.goal_id]["partial"] =
            uniqueGoals[d.goal_id]["partial"] + 1;
        }
      }
    }
  });

  let index = 1; // Start counting from 1

  Object.keys(uniqueGoals).forEach((d) => {
    completed.push(uniqueGoals[d].completed);
    partial.push(uniqueGoals[d].partial);
    labels.push("Goal " + index); // Use the index instead of d
    index++; // Increment the index
  });
  return { labels: labels, completed: completed, partial: partial };
}
