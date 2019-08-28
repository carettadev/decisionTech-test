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
    return this.state.deals.filter(
      deal =>
        deal.productTypes &&
        this.matchesProductFilter(deal.productTypes) &&
        this.matchesProviderFilter(deal.provider.id)
    );
  }

  matchesProductFilter(productTypesToMatch) {
    const productFilters = this.state.productFilters;
    let isMatch = true;
    // if no filters applied then everything matches
    if (!productFilters || !productFilters.length) return isMatch;
    // ignoring Phone product by removing it
    productTypesToMatch = productTypesToMatch.filter(
      prodType => prodType !== "Phone"
    );
    // checking arrays now have equal length and values
    if (productTypesToMatch.length !== productFilters.length) return false;
    productTypesToMatch.forEach(productType => {
      if (productType === "Fibre Broadband") productType = "Broadband";
      if (!productFilters.includes(productType.toLowerCase())) {
        isMatch = false;
      }
    });
    return isMatch;
  }

  matchesProviderFilter(providerToMatch) {
    const providerFilter = this.state.providerFilter;
    if (!providerFilter) return true;
    return providerToMatch === providerFilter;
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
