package com.toyota.tmna.lexusdrivers.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import javax.annotation.Nonnull;

import com.toyota.tmna.lexusdrivers.core.util.ConstantsUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class,
        resourceType = DisplayMessageModel.RESOURCE_TYPE,
        adapters = {DisplayMessageModel.class, ComponentExporter.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DisplayMessageModel implements ComponentExporter {

    protected static final String RESOURCE_TYPE = ConstantsUtil.DISPLAY_MESSAGE_RESOURCE;

    @ValueMapValue(name = "primaryButtonText")
    private String primaryButtonText;

    @ValueMapValue(name = "primaryButtonLink")
    private String primaryButtonLink;

    @ValueMapValue(name = "description")
    private String description;

    @ValueMapValue(name = "verticalCenterAlign")
    private String verticalCenterAlign;

    @ValueMapValue(name = "supportContent")
    private String supportContent;

    @ValueMapValue(name = "title")
    private String title;


    public String getPrimaryButtonText() {
        return primaryButtonText;
    }

    public String getPrimaryButtonLink() {
        return primaryButtonLink;
    }

    public String getDescription() {
        return description;
    }

    public String getVerticalCenterAlign() {
        return verticalCenterAlign;
    }

    public String getSupportContent() {
        return supportContent;
    }

    public String getTitle() {
        return title;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
