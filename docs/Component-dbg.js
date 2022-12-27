sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "sap/ui/core/ComponentSupport", "sap/ui/core/date/Gregorian", "sap/ui/model/type/String"], function (UIComponent, sap_ui_Device, sap_ui_core_ComponentSupport, sap_ui_core_date_Gregorian, sap_ui_model_type_String) {
  const support = sap_ui_Device["support"]; // improve sap-ui-custom.js bundling
  /**
   * @namespace de.marianzeis.githubfollower
   */
  const Component = UIComponent.extend("de.marianzeis.githubfollower.Component", {
    metadata: {
      manifest: "json"
    },
    init: function _init() {
      // call the base component's init function
      UIComponent.prototype.init.call(this);

      // create the views based on the url/hash
      this.getRouter().initialize();
    },
    getContentDensityClass: function _getContentDensityClass() {
      if (this.contentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this.contentDensityClass = "";
        } else if (!support.touch) {
          // apply "compact" mode if touch is not supported
          this.contentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this.contentDensityClass = "sapUiSizeCozy";
        }
      }
      return this.contentDensityClass;
    }
  });
  return Component;
});
//# sourceMappingURL=Component.js.map