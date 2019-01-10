const assert = require("assert");
const percentage = require("../lib/Percentage");

describe("pescentage", function() {
  describe("#evolution", function() {
    it("schould give an evolution ", function() {
      assert.equal(percentage.evolution(100, 200), 100);
      assert.equal(percentage.evolution(100, 150), 50);
      assert.equal(percentage.evolution(50, 100), 50);
    });
  });
});

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it("double done", function(done) {
      setImmediate(done);
    });
  });
});

//   describe("#use promise", function() {
//     it("should complete this test", function(done) {
//       return new Promise(function(resolve) {
//         assert.ok(true);
//         resolve();
//       }).then(done);
//     });
//   });

// describe('hooks', function() {

//     before(function() {
//       // s'exécute avant tous les tests de ce bloc
//     });

//     after(function() {
//       // s'exécute après tous les tests de ce bloc
//     });

//     beforeEach(function() {
//       // s'exécute avant chaque test dans ce bloc
//     });

//     afterEach(function() {
//       // runs after each test in this block
//     });

//     // test cases
//   });
