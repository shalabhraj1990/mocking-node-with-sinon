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
      const writeSpy = sinon.spy(fs, "writeFileSync");
      const fileManagement = proxyquire("./file.management", { fs });
      fileManagement.createFile("text.txt");
      expect(writeSpy.calledWith("./data/text.txt", "")).to.be.true;
    });
    it.skip("should call writeFileSync-injected", () => {
      const writeSpy = sinon.spy(fs, "writeFileSync");
      fileManagement.createFileInjected("text.txt", fs);
      expect(writeSpy.calledWith("./data/text.txt", "")).to.be.true;
    });
    it("should not create anew file if no file name is specified", () => {
      const writeSpy = sinon.spy(fs, "writeFileSync");
      fileManagement.createFileInjected("text.txt", fs);
      try {
        fileManagement.createFile();
      } catch (error) {}
      expect(writeSpy.notCalled("./data/text.txt", "")).to.be.true;
    });
  });
});
