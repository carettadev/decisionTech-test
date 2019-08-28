import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
    expect(result.length).toEqual(11);
  });

  it("should return all broadband deals when broadband filter is applied", () => {
    // WHEN filtering by broadband THEN show the 4 broadband only deals
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);
    sut.setProductFilter("Broadband");
    // Act
    const result = sut.deals;

    // Assert
    expect(result.length).toEqual(4);
  });
  // WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only
  // WHEN filtering by broadband AND mobile THEN show the 1 deal for broadband and mobile only
  // WHEN filtering by Sky THEN show the 1 deal for Sky only
  // WHEN filtering by BT, broadband AND tv THEN show the 2 deals for BT with broadband and tv only
});
