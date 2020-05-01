package com.toyota.tmna.lexusdrivers.core.models;
import javax.annotation.Nonnull;
import javax.inject.Inject;
import com.toyota.tmna.lexusdrivers.core.util.ConstantsUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, resourceType = GlobalNavigationModel.RESOURCE_TYPE, adapters = {
		GlobalNavigationModel.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GlobalNavigationModel implements ComponentExporter {

	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	protected static final String RESOURCE_TYPE = ConstantsUtil.GNAV_MESSAGE_RESOURCE;


	@ValueMapValue(name = "logomediaId")
	private String logomediaId;
	@ValueMapValue(name = "body")
	private String body;
	@ValueMapValue(name = "quickLabel")
	private String quickLabel;
	@ValueMapValue(name = "bottomText")
	private String bottomText;
	@ValueMapValue(name = "titleSelection")
	private String titleSelection;
	@ValueMapValue(name = "carouselMediaId")
	private String carouselMediaId;
	@ValueMapValue(name = "vehicleSelectorDefaultText")
	private String vehicleSelectorDefaultText;
	@ValueMapValue(name = "manageGarageText")
	private String manageGarageText;
	@ValueMapValue(name = "subTitle")
	private String subTitle;
	@ValueMapValue(name = "carouselThumbnail")
	private String carouselThumbnail;
	@ValueMapValue(name = "logoimage")
	private String logoimage;
	@ValueMapValue(name = "manageText")
	private String manageText;
	@ValueMapValue(name = "manageValue")
	private String manageValue;
	@ValueMapValue(name = "carousellinkoutUrl")
	private String carousellinkoutUrl;
	@ValueMapValue(name = "navLabel")
	private String navLabel;
	@ValueMapValue(name = "manageGarageLink")
	private String manageGarageLink;
	@ValueMapValue(name = "yearSelectorDefaultText")
	private String yearSelectorDefaultText;
	@ValueMapValue(name = "selectcarouselTitle")
	private String selectcarouselTitle;
	@ValueMapValue(name = "buttonLabel")
	private String buttonLabel;
	@ValueMapValue(name = "videoslide")
	private String videoslide;
	@ValueMapValue(name = "vINLabel")
	private String vINLabel;
	@ValueMapValue(name = "carousellinktype")
	private String carousellinktype;
	@ValueMapValue(name = "quicknavLabel")
	private String quicknavLabel;
	@ValueMapValue(name = "name")
	private String name;
	@ValueMapValue(name = "manageName")
	private String manageName;
	@ValueMapValue(name = "quicklinkURL")
	private String quicklinkURL;
	@ValueMapValue(name = "manageLinkType")
	private String manageLinkType;
	@ValueMapValue(name = "quickvalue")
	private String quickvalue;
	@ValueMapValue(name = "titleaccoutnt")
	private String titleaccoutnt;
    @ValueMapValue(name = "placeholdertext")
	private String placeholdertext;
	@ValueMapValue(name = "searchUrlPath")
	private String searchUrlPath;

	
	public String getPlaceholdertext() {
		return placeholdertext;
	}
	     
	public String getSearchUrlPath() {
		return searchUrlPath;
	}
	public String getLogomediaId() {
		return logomediaId;
	}

	public String getBody() {
		return body;
	}

	public String getQuickLabel() {
		return quickLabel;
	}

	public String getBottomText() {
		return bottomText;
	}

	public String getTitleSelection() {
		return titleSelection;
	}

	public String getCarouselMediaId() {
		return carouselMediaId;
	}

	public String getVehicleSelectorDefaultText() {
		return vehicleSelectorDefaultText;
	}

	public String getManageGarageText() {
		return manageGarageText;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public String getCarouselThumbnail() {
		return carouselThumbnail;
	}

	public String getLogoimage() {
		return logoimage;
	}

	public String getManageText() {
		return manageText;
	}

	public String getManageValue() {
		return manageValue;
	}

	public String getCarousellinkoutUrl() {
		return carousellinkoutUrl;
	}

	public String getNavLabel() {
		return navLabel;
	}

	public String getManageGarageLink() {
		return manageGarageLink;
	}

	public String getYearSelectorDefaultText() {
		return yearSelectorDefaultText;
	}

	public String getSelectcarouselTitle() {
		return selectcarouselTitle;
	}

	public String getButtonLabel() {
		return buttonLabel;
	}

	public String getVideoslide() {
		return videoslide;
	}

	public String getvINLabel() {
		return vINLabel;
	}

	public String getCarousellinktype() {
		return carousellinktype;
	}

	public String getQuicknavLabel() {
		return quicknavLabel;
	}

	public String getName() {
		return name;
	}

	public String getManageName() {
		return manageName;
	}

	public String getQuicklinkURL() {
		return quicklinkURL;
	}

	public String getManageLinkType() {
		return manageLinkType;
	}

	public String getQuickvalue() {
		return quickvalue;
	}

	public String getTitleaccoutnt() {
		return titleaccoutnt;
	}

	@Inject
	@Optional
	@Via("resource")
	private Resource quicklinks;
	
	public Resource getQuicklinks() {
		
		return quicklinks;
	}
	@Inject
	@Optional
	@Via("resource")
	private Resource navigationLinks;
	
	public Resource getNavigationLinks() {
		
		return navigationLinks;
	}
	@Inject
	@Optional
	@Via("resource")
	private Resource navigationMessages;
	
	public Resource getNavigationMessages() {
		
		return navigationMessages;
	}
	@Inject
	@Optional
	@Via("resource")
	private Resource manageGarage;
	
	public Resource getManageGarage() {
		
		return manageGarage;
	}
	@Inject
	@Optional
	@Via("resource")
	private Resource loggedIn;
	
	public Resource getLoggedIn() {
		
		return loggedIn;
	}
	@Inject
	@Optional
	@Via("resource")
	private Resource loggedOut;
	
	public Resource getLoggedOut() {
		
		return loggedOut;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}
