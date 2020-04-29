package com.toyota.tmna.lexusdrivers.core.models;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import com.toyota.tmna.lexusdrivers.core.util.ConstantsUtil;
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
        ComponentExporter.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ConstantsUtil.GLOBAL_FOOTER_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GlobalFooterModel implements ComponentExporter {

    private static final Logger LOG = LoggerFactory.getLogger(GlobalFooterModel.class);
    static final String RESOURCE_TYPE = ConstantsUtil.GLOBAL_FOOTER_RESOURCE;

    @SlingObject
    private
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

    public String getFootercolumnsOne() {
        ResourceResolver resourceResolver = req.getResourceResolver();
        Resource resource = resourceResolver.getResource(footercolumns.getPath());
        JSONArray jsonA = new JSONArray();
        if (resource != null && resource.hasChildren()) {
            Iterable<Resource> children = resource.getChildren();
            for (Resource child : children) {

                if (child.getValueMap().containsKey(ConstantsUtil.GF_COLUMN_HEADLINE)) {
                    String footerColumnHeadline = child.getValueMap().get(ConstantsUtil.GF_COLUMN_HEADLINE).toString();

                    try {
                        JSONObject jsonObj = new JSONObject();
                        JSONObject obi = new JSONObject();

                        jsonObj.put("footerColumnHeadline", footerColumnHeadline);
                        JSONArray jsonAGrand = new JSONArray();
                        Resource resourceChild = resourceResolver.getResource(child.getPath() + ConstantsUtil.GLOBAL_FOOTER_LINKS_PATH);
                        Iterable<Resource> grandchildren = null;
                        if (resourceChild != null) {
                            grandchildren = resourceChild.getChildren();

                            String linktargeturl = null;
                            String linktitle = null;
                            String openinnew = null;
                            String thirdpartyicon = null;
                            for (Resource grandchild : grandchildren) {

                                if (grandchild.getValueMap().containsKey(ConstantsUtil.GF_LINK_TARGET_URL)) {
                                    linktargeturl = grandchild.getValueMap().get(ConstantsUtil.GF_LINK_TARGET_URL).toString();
                                }
                                if (grandchild.getValueMap().containsKey(ConstantsUtil.GF_LINK_TITLE)) {
                                    linktitle = grandchild.getValueMap().get(ConstantsUtil.GF_LINK_TITLE).toString();
                                }
                                if (grandchild.getValueMap().containsKey(ConstantsUtil.GF_OPEN_NEW)) {
                                    openinnew = grandchild.getValueMap().get(ConstantsUtil.GF_OPEN_NEW).toString();
                                }
                                if (grandchild.getValueMap().containsKey(ConstantsUtil.GF_THIRD_PARTY_ICON)) {
                                    thirdpartyicon = grandchild.getValueMap().get(ConstantsUtil.GF_THIRD_PARTY_ICON).toString();
                                }

                                Map<String, String> tempMap = new HashMap<>();
                                if (linktitle != null) {
                                    tempMap.put(ConstantsUtil.GF_LINK_TITLE, linktitle);
                                }
                                if (linktargeturl != null) {
                                    tempMap.put(ConstantsUtil.GF_LINK_TARGET_URL, linktargeturl);
                                }
                                if (openinnew != null) {
                                    tempMap.put(ConstantsUtil.GF_OPEN_NEW, openinnew);
                                }
                                if (thirdpartyicon != null) {
                                    tempMap.put(ConstantsUtil.GF_THIRD_PARTY_ICON, thirdpartyicon);
                                }

                                jsonAGrand.put(tempMap);

                            }
                        }
                        JSONArray InnerLoopArray = new JSONArray();
                        jsonObj.put(ConstantsUtil.GLOBAL_FOOTER_LINKLIST, jsonAGrand);
                        InnerLoopArray.put(jsonObj);
                        obi.put(ConstantsUtil.GLOBAL_FOOTER_LINK, InnerLoopArray);
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
            //String footercolumnsOne = arr.toString();

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

    public String getFootercolumnsSecond() {

        ResourceResolver resourceResolver = req.getResourceResolver();
        Resource resource = resourceResolver.getResource(footercolumnsTwo.getPath());
        JSONArray jsonA = new JSONArray();
        if (resource != null && resource.hasChildren()) {
            Iterable<Resource> children = resource.getChildren();

            for (Resource child : children) {

                if (child.getValueMap().containsKey(ConstantsUtil.GF_LINKS_TITLE)) {
                    String linksUrl = null;
                    String openinnew = null;
                    String linkstitle = null;
                    if (child.getValueMap().containsKey(ConstantsUtil.GF_LINKS_URLS)) {
                        linksUrl = child.getValueMap().get(ConstantsUtil.GF_LINKS_URLS).toString();
                    }

                    if (child.getValueMap().containsKey(ConstantsUtil.GF_OPEN_NEW)) {
                        openinnew = child.getValueMap().get(ConstantsUtil.GF_OPEN_NEW).toString();
                    }

                    if (child.getValueMap().containsKey(ConstantsUtil.GF_LINKS_TITLE)) {
                        linkstitle = child.getValueMap().get(ConstantsUtil.GF_LINKS_TITLE).toString();
                    }


                    try {
                        JSONObject jsonObj = new JSONObject();

                        if (linksUrl != null) {
                            jsonObj.put(ConstantsUtil.GF_LINKS_URLS, linksUrl);
                        }
                        if (openinnew != null) {
                            jsonObj.put(ConstantsUtil.GF_OPEN_NEW, openinnew);
                        }
                        if (linkstitle != null) {
                            jsonObj.put(ConstantsUtil.GF_LINKS_TITLE, linkstitle);
                        }
                        jsonA.put(jsonObj);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }

        }

       // String footercolumnsSecond = jsonA.toString();

        return jsonA.toString();
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
