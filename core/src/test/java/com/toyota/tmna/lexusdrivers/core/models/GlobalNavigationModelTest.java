package com.toyota.tmna.lexusdrivers.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.factory.ModelFactory;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;
import javax.jcr.Session;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GlobalNavigationModelTest {
    private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
    @Mock
    private ModelFactory modelFactory;
    private   GlobalNavigationModel globalNavigationModel;
    @BeforeEach
    void setUp() {
        context.addModelsForClasses(GlobalNavigationModel.class);
        context.load().json("/com/toyota/tmna/lexusdrivers/core/models/GlobalNavigationTest.json", "/content");
        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        context.currentResource("/content");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
    }

    @Test
    void getPlaceholdertext() {
        String expected = "SEARCH...";
        String actual = globalNavigationModel.getPlaceholdertext();
        assertEquals(expected, actual);
    }

    @Test
    void getSearchUrlPath() {
        String expected = "/lexusdrivers/search?searchKey=";
        String actual = globalNavigationModel.getSearchUrlPath();
        assertEquals(expected, actual);
    }

    @Test
    void getLogomediaId() {
        String expected = "{0C838CF3-5EA0-4D57-843A-F5ACAFD082C8}";
        String actual = globalNavigationModel.getLogomediaId();
        assertEquals(expected, actual);
    }

    @Test
    void getBody() {
        String expected = "<ul><li><a class=\"rich-text-anchor\" href=\"/lexusdrivers/VehicleHealthReportLandingPage\" target=\"_self\">Vehicle Health Reports</a></li>" +
                "<li><a class=\"rich-text-anchor\" href=\"/lexusdrivers/history\" target=\"_self\">Service History</a></li>" +
                "<li><a class=\"rich-text-anchor\" href=\"/lexusdrivers/service/maintenance-schedules\" target=\"_self\">Maintenance Schedule</a></li>" +
                "<li><a class=\"rich-text-anchor\" href=\"/lexusdrivers/resources\" target=\"_self\">Vehicle Specs, Maintenance and Warranty Information</a></li>" +
                "</ul><p> </p>";
        String actual = globalNavigationModel.getBody();
        assertEquals(expected, actual);
    }

    @Test
    void getQuickLabel() {
        String expected = "View All Resouces";
        String actual = globalNavigationModel.getQuickLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getBottomText() {
        String expected = "Add this vehicle to your account by <a href=\\\"/lexusdrivers/account/login\\\" target=\\\"_self\\\">SIGNING IN</a> or <a href=\\\"/lexusdrivers/account/register\\\">CREATING AN ACCOUNT</a>.";
        String actual = globalNavigationModel.getBottomText();
        assertEquals(expected, actual);
    }

    @Test
    void getTitleSelection() {
        String expected = "Make a selection for a more customized experience.";
        String actual = globalNavigationModel.getTitleSelection();
        assertEquals(expected, actual);
    }

    @Test
    void getCarouselMediaId() {
        String expected = "{222CED62-10C3-4E9A-BFB5-7BB97EFE8B86}";
        String actual = globalNavigationModel.getCarouselMediaId();
        assertEquals(expected, actual);
    }

    @Test
    void getVehicleSelectorDefaultText() {
        String expected = "SELECT A MODEL";
        String actual = globalNavigationModel.getVehicleSelectorDefaultText();
        assertEquals(expected, actual);
    }

    @Test
    void getManageGarageText() {
        String expected = "Manage Garage";
        String actual = globalNavigationModel.getManageGarageText();
        assertEquals(expected, actual);
    }

    @Test
    void getSubTitle() {
        String expected = "clear";
        String actual = globalNavigationModel.getSubTitle();
        assertEquals(expected, actual);
    }

    @Test
    void getCarouselThumbnail() {
        String expected = "https://drivers.lexus.com/lexusdrivers/-/media/TMNA.LDNG/Project/LexusDrivers/Global-Nav/Side/2019/LexusDrivers-GlobalNav-SelectAVehicle-CreateAccount-750x460-LEX-ESG-MY18-0031_M85.jpg?h=460&la=en&w=750&rev=8edaa9ca32ad4e42aa65697c0861a6fc&hash=6EBA82C4963F9E59C83DB6C1160CECB0";
        String actual = globalNavigationModel.getCarouselThumbnail();
        assertEquals(expected, actual);
    }

    @Test
    void getLogoimage() {
        String expected = "https://drivers.lexus.com/lexusdrivers/-/jssmedia/TMNA.LDNG/Project/LexusDrivers/Global-Nav/LD-Logo-2X-01.png?h=60&la=en&w=410&rev=e39b4b05b3ee4595ac641469405daeb4&hash=8C9183536759773D69116302EAE28165";
        String actual = globalNavigationModel.getLogoimage();
        assertEquals(expected, actual);
    }

    @Test
    void getManageText() {
        String expected = "Manage Garage Link";
        String actual = globalNavigationModel.getManageText();
        assertEquals(expected, actual);
    }

    @Test
    void getManageValue() {
        String expected = "My Garage";
        String actual = globalNavigationModel.getManageValue();
        assertEquals(expected, actual);
    }

    @Test
    void getCarousellinkoutUrl() {
        String expected = "/lexusdrivers/account/register";
        String actual = globalNavigationModel.getCarousellinkoutUrl();
        assertEquals(expected, actual);
    }

    @Test
    void getNavLabel() {
        String expected = "Select A Vehicle";
        String actual = globalNavigationModel.getNavLabel();
        assertEquals(expected, actual);

    }

    @Test
    void getManageGarageLink() {
        String expected = "/lexusdrivers/vehicleSettings";
        String actual = globalNavigationModel.getManageGarageLink();
        assertEquals(expected, actual);
    }

    @Test
    void getYearSelectorDefaultText() {
        String expected = "SELECT A YEAR";
        String actual = globalNavigationModel.getYearSelectorDefaultText();
        assertEquals(expected, actual);
    }

    @Test
    void getSelectcarouselTitle() {
        String expected = "CREATE YOUR LEXUS DRIVERS ACCOUNT";
        String actual = globalNavigationModel.getSelectcarouselTitle();
        assertEquals(expected, actual);
    }

    @Test
    void getButtonLabel() {
        String expected = "SUBMIT";
        String actual = globalNavigationModel.getButtonLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getVideoslide() {
        String expected = "false";
        String actual = globalNavigationModel.getVideoslide();
        assertEquals(expected, actual);
    }

    @Test
    void getvINLabel() {
        String expected = "VIN:";
        String actual = globalNavigationModel.getvINLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getCarousellinktype() {
        String expected = "external";
        String actual = globalNavigationModel.getCarousellinktype();
        assertEquals(expected, actual);
    }

    @Test
    void getQuicknavLabel() {
        String expected = "Quick Links";
        String actual = globalNavigationModel.getQuicknavLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getName() {
        String expected = "Select Vehicle";
        String actual = globalNavigationModel.getName();
        assertEquals(expected, actual);
    }

    @Test
    void getManageName() {
        String expected = "Manage Garage";
        String actual = globalNavigationModel.getManageName();
        assertEquals(expected, actual);
    }

    @Test
    void getQuicklinkURL() {
        String expected = "/lexusdrivers/resources";
        String actual = globalNavigationModel.getQuicklinkURL();
        assertEquals(expected, actual);
    }

    @Test
    void getManageLinkType() {
        String expected = "external";
        String actual = globalNavigationModel.getManageLinkType();
        assertEquals(expected, actual);
    }

    @Test
    void getQuickvalue() {
        String expected = "<link linktype=\\\"external\\\" url=\\\"/lexusdrivers/resources\\\" anchor=\\\"\\\" target=\\\"\\\" />";
        String actual = globalNavigationModel.getQuickvalue();
        assertEquals(expected, actual);
    }

    @Test
    void getTitleaccoutnt() {
        String expected = "CREATE YOUR ACCOUNT TODAY FOR ACCESS TO THESE SERVICES AND MORE";
        String actual = globalNavigationModel.getTitleaccoutnt();
        assertEquals(expected, actual);
    }
    @Mock
    private ResourceResolver leakedResourceResolver;
    @Test
    void getQuicklinks() {
        Resource expected = context.resourceResolver().getResource("/content/quicklinks");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getQuicklinks();
        assertNotNull(actual);
        assertEquals("/content/quicklinks", actual.getPath());
        assert expected != null;
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }

    @Test
    void getNavigationLinks() {
        Resource expected = context.resourceResolver().getResource("/content/navigationLinks");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getNavigationLinks();
        assertNotNull(actual);
        assert expected != null;
        assertEquals(expected.getPath(), actual.getPath());
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }

    @Test
    void getNavigationMessages() {
        Resource expected = context.resourceResolver().getResource("/content/navigationMessages");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getNavigationMessages();
        assertNotNull(actual);
        assert expected != null;
        assertEquals(expected.getPath(), actual.getPath());
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }

    @Test
    void getManageGarage() {
        Resource expected = context.resourceResolver().getResource("/content/manageGarage");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getManageGarage();
        assertNotNull(actual);
        assert expected != null;
        assertEquals(expected.getPath(), actual.getPath());
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }

    @Test
    void getLoggedIn() {
        Resource expected = context.resourceResolver().getResource("/content/loggedIn");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getLoggedIn();
        assertNotNull(actual);
        assert expected != null;
        assertEquals(expected.getPath(), actual.getPath());
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }

    @Test
    void getLoggedOut() {
        Resource expected = context.resourceResolver().getResource("/content/loggedOut");
        globalNavigationModel = context.request().adaptTo(GlobalNavigationModel.class);
        assert globalNavigationModel != null;
        Resource actual = globalNavigationModel.getLoggedOut();
        assertNotNull(actual);
        assert expected != null;
        assertEquals(expected.getPath(), actual.getPath());
        assertEquals(expected.getValueMap().toString(), actual.getValueMap().toString());
    }
}