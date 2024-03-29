var torture = false;
const CODEFORCES_URL = "https://codeforces.com/contest/";
const RULE_ID = 1;
const PROBLEMSET = "https://codeforces.com/api/problemset.problems";
const state = {
  ProblemStatus: false,
  leetCodeProblem: {
    url: null,
    name: null
  },
  lastSubmissionDate: new Date(0),
  solvedListenerActive: false,
  lastAttemptedUrl: null,
  urlListener: null
}

async function setRedirectRule(redirectUrl) {
  const redirectRule = {
    id: RULE_ID,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: redirectUrl }
    },
    condition: {
      urlFilter: "*://*/*",
      excludedInitiatorDomains: [
        "codeforces.com",
        "www.codeforces.com",
        "developer.chrome.com"
      ],

      resourceTypes: ["main_frame"]
    }
  }

  try {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: [redirectRule]
    })
    console.log("Redirect rule updated")
  } catch (error) {
    console.error("Error updating redirect rule:", error)
  }
}

async function generateRandomProblem(){
  try {
    const response = await fetch(PROBLEMSET);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if(data["status"] == "OK"){
      const problemas = data["result"]["problems"];
      const size = problemas.length-1;
      const randomIndex = Math.floor(Math.random() * size);
      const result = {
        name: problemas[randomIndex]["name"],
        url: CODEFORCES_URL + problemas[randomIndex]["contestId"] + "/problem/" + problemas[randomIndex]["index"]
      };
      return result;
    }else{
      console.log("codeforces cayo!");
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // You might want to handle the error here or rethrow it for the caller to handle
    throw error;
  }
}


export const updateProblemState = async (problem) => {
  //await storage.updateProblem(problem, state.ProblemStatus);
}

export const updateStorage = async () => {
  try {
    let problem = await generateRandomProblem();
    state.ProblemStatus = false
    updateProblemState(problem);
    if (!state.ProblemStatus) await setRedirectRule(problem.url)
  } catch (error) {
    throw new Error("Error generating randoxdm problem: " + error)
  }
}

updateStorage();