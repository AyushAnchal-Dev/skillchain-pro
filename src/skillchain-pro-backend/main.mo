import Array "mo:base/Array";
import Text "mo:base/Text";

actor SkillChainNFT {

  // Define Challenge type
  type Challenge = {
    id: Nat;
    title: Text;
    student: Text;
    status: Text;    // "pending", "approved", "rejected"
    verifier: Text;
  };

  // Variable to store challenges
  var challenges: [Challenge] = [];

  // Submit a new challenge
  public func submitChallenge(title: Text, student: Text) : async Nat {
    let id = challenges.size(); // ✅ use .size() instead of .len()
    let newChallenge : Challenge = {
      id;
      title;
      student;
      status = "pending";
      verifier = "";
    };
    challenges := Array.append(challenges, [newChallenge]);
    return id;
  };

  // Verify a challenge by ID
  public func verifyChallenge(id: Nat, verifier: Text, decision: Text) : async Bool {
    if (id >= challenges.size()) {
      return false;
    };

    let existing = challenges[id];

    let updatedChallenge : Challenge = {
      id = existing.id;
      title = existing.title;
      student = existing.student;
      status = decision;
      verifier = verifier;
    };

    // ✅ We need to create a new array with the updated challenge
    challenges := Array.tabulate<Challenge>(challenges.size(), func(i: Nat) : Challenge {
      if (i == id) {
        updatedChallenge
      } else {
        challenges[i]
      }
    });

    return true;
  };

  // Get all challenges
  public query func getChallenges() : async [Challenge] {
    return challenges;
  };
};