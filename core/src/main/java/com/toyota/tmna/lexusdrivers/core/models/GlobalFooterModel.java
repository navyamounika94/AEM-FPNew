package com.toyota.tmna.lexusdrivers.core.models;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.json.JSONArray;
import org.json.JSONException;
import org.slf4j.Logger;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, resourceType = GlobalFooterModel.RESOURCE_TYPE, adapters = {
		GlobalFooterModel.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = "footer", extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GlobalFooterModel implements ComponentExporter {

	private static final Logger LOG = LoggerFactory.getLogger(GlobalFooterModel.class);

	protected static final String RESOURCE_TYPE = "lexusdrivers/components/content/globalfooter";

	@SlingObject

	SlingHttpServletRequest req;

	@ValueMapValue(name = "headline")
	private String headline;
	@ValueMapValue(name = "headPathOpennewwindow")
	private String headPathOpennewwindow;
	@ValueMapValue(name = "copyopennewwindow")
	private String copyopennewwindow;

	@ValueMapValue(name = "copyRightText")
	private String copyRightText;

	@ValueMapValue(name = "headlinePath")
	private String headlinePath;

	@ValueMapValue(name = "copyRightLink")
	private String copyRightLink;

	@ValueMapValue(name = "copyRightDesc")
	private String copyRightDesc;

	@Inject
	@Optional
	@Via("resource")
	private Resource footercolumns;

	public String footercolumnsOne;

	public String getFootercolumnsOne() {

		ResourceResolver resourceResolver = req.getResourceResolver();
		Resource resource = resourceResolver.getResource(footercolumns.getPath());
		JSONArray jsonA = new JSONArray();
		if (resource.hasChildren() && resource != null) {
			Iterable<Resource> children = resource.getChildren();

			for (Resource child : children) {

				if (child.getValueMap().containsKey("footerColumnHeadline")) {
					String footerColumnHeadline = child.getValueMap().get("footerColumnHeadline").toString();

					try {
						JSONObject jsonObj = new JSONObject();
						JSONObject obi = new JSONObject();

						jsonObj.put("footerColumnHeadline", footerColumnHeadline);

						Resource resourceChild = resourceResolver.getResource(child.getPath() + "/footerlinks");
						Iterable<Resource> grandchildren = resourceChild.getChildren();

						JSONArray jsonAGrand = new JSONArray();
						String linktargeturl = null;
						String linktitle = null;
						String openinnew = null;
						String thirdpartyicon = null;
						for (Resource grandchild : grandchildren) {

							if (grandchild.getValueMap().containsKey("linktargeturl")) {
								linktargeturl = grandchild.getValueMap().get("linktargeturl").toString();
							}
							if (grandchild.getValueMap().containsKey("linktitle")) {
								linktitle = grandchild.getValueMap().get("linktitle").toString();
							}
							if (grandchild.getValueMap().containsKey("openinnew")) {
								openinnew = grandchild.getValueMap().get("openinnew").toString();
							}
							if (grandchild.getValueMap().containsKey("thirdpartyicon")) {
								thirdpartyicon = grandchild.getValueMap().get("thirdpartyicon").toString();
							}

							Map<String, String> tempMap = new HashMap<>();
							if (linktitle != null) {
								tempMap.put("linktitle", linktitle);
							}
							if (linktargeturl != null) {
								tempMap.put("linktargeturl", linktargeturl);
							}
							if (openinnew != null) {
								tempMap.put("openinnew", openinnew);
							}
							if (thirdpartyicon != null) {
								tempMap.put("thirdpartyicon", thirdpartyicon);
							}

							jsonAGrand.put(tempMap);

						}

						JSONArray InnerLoopArray = new JSONArray();

						jsonObj.put("linklist", jsonAGrand);

						InnerLoopArray.put(jsonObj);

						obi.put("footerlinks", InnerLoopArray);

						jsonA.put(obi);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}

		}

		JSONObject oje = new JSONObject();

		JSONArray arr = new JSONArray();
		try {
			oje.put("columns", jsonA);

			arr.put(oje);
			footercolumnsOne = arr.toString();

		} catch (JSONException e) {

			e.printStackTrace();
		}

		return arr.toString();
	}

	public void setFootercolumns(Resource footercolumns) {
		this.footercolumns = footercolumns;
	}

	@Inject
	@Optional
	@Via("resource")
	private Resource footercolumnsTwo;

	public String footercolumnsSecond;

	public String getFootercolumnsSecond() {

		ResourceResolver resourceResolver = req.getResourceResolver();
		Resource resource = resourceResolver.getResource(footercolumnsTwo.getPath());
		JSONArray jsonA = new JSONArray();
		if (resource.hasChildren() && resource != null) {
			Iterable<Resource> children = resource.getChildren();

			for (Resource child : children) {

				if (child.getValueMap().containsKey("linkstitle")) {
					String linksUrl = null;
					String openinnew = null;
					String linkstitle = null;
					if (child.getValueMap().containsKey("linksUrl")) {
						linksUrl = child.getValueMap().get("linksUrl").toString();
					}

					if (child.getValueMap().containsKey("openinnew")) {
						openinnew = child.getValueMap().get("openinnew").toString();
					}

					if (child.getValueMap().containsKey("linkstitle")) {
						linkstitle = child.getValueMap().get("linkstitle").toString();
					}
					

					try {
						JSONObject jsonObj = new JSONObject();

						if (linksUrl != null) {
							jsonObj.put("linksUrl", linksUrl);
						}
						if (openinnew != null) {
							jsonObj.put("openinnew", openinnew);
						}
						if (linkstitle != null) {
							jsonObj.put("linkstitle", linkstitle);
						}
						jsonA.put(jsonObj);
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			}

		}

		footercolumnsSecond = jsonA.toString();

		return footercolumnsSecond;
	}

	public String getCopyopennewwindow() {
		return copyopennewwindow;
	}

	public String getHeadPathOpennewwindow() {
		return headPathOpennewwindow;
	}

	public String getCopyRightDesc() {
		return copyRightDesc;
	}

	public String getHeadlinePath() {
		return headlinePath;
	}

	public String getHeadline() {
		return headline;
	}

	public String getCopyRightText() {
		return copyRightText;
	}

	public String getCopyRightLink() {
		return copyRightLink;
	}

	@Nonnull
	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}
