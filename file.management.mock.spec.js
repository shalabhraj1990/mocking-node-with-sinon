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
      const writeMock = sinon.mock(fs);
      writeMock.expects("writeFileSync").once();
      const fileManagement = proxyquire("./file.management", { fs });
      fileManagement.createFile("test.txt");
      writeMock.verify();
    });
    it("createfileSafe should create a new file with a number appended", () => {
      const writeMock = sinon.mock(fs);
      writeMock.expects("writeFileSync").withArgs("./data/test.txt").throws();
      writeMock.expects("writeFileSync").withArgs("./data/test1.txt").once();
      writeMock.expects("readdirSync").returns(["test.txt"]).once();
      const fileManagement = proxyquire("./file.management", { fs });
      fileManagement.createFileSafe("test.txt");
      writeMock.verify();
    });
    it("createFile should never call writeFileSync when the file is emplty", () => {
      const writeMock = sinon.mock(fs);
      writeMock.expects("writeFileSync").never();
      const fileManagement = proxyquire("./file.management", { fs });
      try {
        fileManagement.createFile();
      } catch (error) {}
      writeMock.verify();
    });
  });
});
