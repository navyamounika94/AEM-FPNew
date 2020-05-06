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
        resourceType = ForgotPasswordModel.RESOURCE_TYPE,
        adapters = {ForgotPasswordModel.class, ComponentExporter.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ForgotPasswordModel implements ComponentExporter {

    protected static final String RESOURCE_TYPE = ConstantsUtil.FP_RESOURCE_FOLDER + "fp";

    @ValueMapValue(name = "emailValidations")
    private String emailValidations;

    @ValueMapValue(name = "emailValidationError")
    private String emailValidationError;

   @ValueMapValue(name = "accountactivationError")
    private String accountactivationError;

    @ValueMapValue(name = "emailRequiredMessage")
    private String emailRequiredMessage;

    @ValueMapValue(name = "emailField")
    private String emailField;

    @ValueMapValue(name = "sendEmailLabel")
    private String sendEmailLabel;

    @ValueMapValue(name = "successPage")
    private String successPage;

    @ValueMapValue(name = "description")
    private String description;

    @ValueMapValue(name = "needMoreHelp")
    private String needMoreHelp;

    @ValueMapValue(name = "title")
    private String title;

    @ValueMapValue(name = "displaydescription")
    private String displaydescription;

    
    @ValueMapValue(name = "displayprimaryButtonLink")
    private String displayprimaryButtonLink;

    @ValueMapValue(name = "displaysupportContent")
    private String displaysupportContent;

    @ValueMapValue(name = "diplaytitle")
    private String diplaytitle;

    @ValueMapValue(name = "displayverticalCenterAlign")
    private String displayverticalCenterAlign;

    
    public String getDisplaydescription() {
        return displaydescription;
    }

   
    public String getDisplayprimaryButtonLink() {
        return displayprimaryButtonLink;
    }

    public String getDisplaysupportContent() {
        return displaysupportContent;
    }

    public String getDiplaytitle() {
        return diplaytitle;
    }

    public String getDisplayverticalCenterAlign() {
        return displayverticalCenterAlign;
    }

    public String getemailValidationError() {
        return emailValidationError;
    }
    public String getaccountactivationError() {
        return accountactivationError;
    }
    public String getEmailValidations() {
        return emailValidations;
    }

    public String getEmailRequiredMessage() {
        return emailRequiredMessage;
    }


    public String getEmailField() {
        return emailField;
    }


    public String getSendEmailLabel() {
        return sendEmailLabel;
    }


    public String getSuccessPage() {
        return successPage;
    }


    public String getDescription() {
        return description;
    }


    public String getNeedMoreHelp() {
        return needMoreHelp;
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
