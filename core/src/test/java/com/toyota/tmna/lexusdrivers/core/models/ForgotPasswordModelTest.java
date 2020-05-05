package com.toyota.tmna.lexusdrivers.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.*;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ForgotPasswordModelTest {
    private final AemContext context = new AemContext();
    @Mock
    private ModelFactory modelFactory;
    private   ForgotPasswordModel forgotPasswordModel;


    @BeforeEach
    void setUp() {
        context.addModelsForClasses(ForgotPasswordModel.class);
        context.load().json("/com/toyota/tmna/lexusdrivers/core/models/ForgotPasswordTest.json", "/content");
       context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        context.currentResource("/content/forgotpassword");
         forgotPasswordModel = context.request().adaptTo(ForgotPasswordModel.class);

    }

    @Test
    void getDisplaydescription() {
         String expected = "We sent password reset instructions to";
        String actual = forgotPasswordModel.getDisplaydescription();
        assertEquals(expected, actual);
    }

    
    @Test
    void getDisplayprimaryButtonLink() {
         String expected = "/lexusdrivers/account/login";
        String actual = forgotPasswordModel.getDisplayprimaryButtonLink();
        assertEquals(expected, actual);
    }

    @Test
    void getDisplaysupportContent() {
         String expected = "RESEND PASSWORD RESET EMAIL";
        String actual = forgotPasswordModel.getDisplaysupportContent();
        assertEquals(expected, actual);
    }

    @Test
    void getDiplaytitle() {
         String expected = "Success";
        String actual = forgotPasswordModel.getDiplaytitle();
        assertEquals(expected, actual);
    }

    @Test
    void getDisplayverticalCenterAlign() {
         String expected = "true";
        String actual = forgotPasswordModel.getDisplayverticalCenterAlign();
        assertEquals(expected, actual);
    }

    @Test
    void getEmailValidations() {
        String expected = "Email check";
        String actual = forgotPasswordModel.getEmailValidations();
        assertEquals(expected, actual);
    }

    @Test
    void getEmailRequiredMessage() {
        String expected = "/content/core-components-examples/library";
        String actual = forgotPasswordModel.getEmailRequiredMessage();
        assertEquals(expected, actual);
    }

    @Test
    void getEmailField() {
        String expected = "Email";
        String actual = forgotPasswordModel.getEmailField();
        assertEquals(expected, actual);
    }

    @Test
    void getSendEmailLabel() {
        String expected = "send Email";
        String actual = forgotPasswordModel.getSendEmailLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getSuccessPage() {
        String expected = "Thanks you ";
        String actual = forgotPasswordModel.getSuccessPage();
        assertEquals(expected, actual);
    }

    @Test
    void getDescription() {
        String expected = "Forgot Password Description";
        String actual = forgotPasswordModel.getDescription();
        assertEquals(expected, actual);
    }

    @Test
    void getNeedMoreHelp() {
        String expected = "NEED MORE HELP?";
        String actual = forgotPasswordModel.getNeedMoreHelp();
        assertEquals(expected, actual);
    }

    @Test
    void getTitle() {
        String expected = "Forgot Password ?";
        String actual = forgotPasswordModel.getTitle();
        assertEquals(expected, actual);
    }



}