const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");
const fileManagement = require("./file.management");

describe("File Management", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("when creating a new file", () => {
    it("should call writeFileSync", () => {
      const writeSpy = sinon.stub(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });
      fileManagement.createFile("text.txt");
      expect(writeSpy.callCount).to.equal(1);
    });
    it("should throw an exception if file slready exisits", () => {
      const writeStube = sinon.stub(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });
      expect(() => {
        fileManagement.createFile("test.txt").to.throws();
      });
    });
    it("createFileSafe should create a file named test1 when test already exists", () => {
      const writeStube = sinon.stub(fs, "writeFileSync");
      const readStube = sinon.stub(fs, "readdirSync");
      const fileManagement = proxyquire("./file.management", { fs });
      writeStube.withArgs("./data/test.txt").throws(new Error());
      writeStube.returns(undefined);
      readStube.returns(["test.txt"]);
    });
  });
});
