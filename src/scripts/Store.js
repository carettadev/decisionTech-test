import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    //TODO: implement filter here
    return this.state.deals.filter(
      deal => deal.productTypes && this.matchesProductFilter(deal.productTypes)
    );
  }

  matchesProductFilter(productTypesToMatch) {
    const productFilters = this.state.productFilters;
    if (!productFilters || !productFilters.length) return true;
    let isMatch = true;
    productTypesToMatch.forEach(productType => {
      if (productType !== "Phone") {
        if (productType === "Fibre Broadband") productType = "Broadband";
        if (productType !== "Broadband") {
          isMatch = false;
        }
      }
    });
    return isMatch;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
