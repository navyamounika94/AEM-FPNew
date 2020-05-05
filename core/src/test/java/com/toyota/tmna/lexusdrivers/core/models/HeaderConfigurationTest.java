package com.toyota.tmna.lexusdrivers.core.models;

import com.toyota.tmna.lexusdrivers.core.factory.HeaderFactoryEndPoints;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HeaderConfigurationTest {
    private final AemContext context = new AemContext();
    @Mock
    private ModelFactory modelFactory;
    private   HeaderConfiguration headerConfiguration;


    @BeforeEach
    void setUp() {
        context.addModelsForClasses(ForgotPasswordModel.class);
        context.load().json("/com/toyota/tmna/lexusdrivers/core/models/HeaderConfigurationTest.json", "/content");
        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        context.currentResource("/content");
        headerConfiguration = context.request().adaptTo(HeaderConfiguration.class);
        HeaderFactoryEndPoints headerFactory = new HeaderFactoryEndPoints();
    }

    @Test
    void getEospublic() {
         String actual = headerConfiguration.getEospublic();
        assertNotNull(actual);
    }

    @Test
    void getXdcsapikey() {
           String actual = headerConfiguration.getEospublic();
        assertNotNull(actual);
    }

    @Test
    void getXeosapikey() {
        String actual = headerConfiguration.getXeosapikey();
        assertNotNull(actual);
    }

    @Test
    void getDcs3() {
          String actual = headerConfiguration.getDcs3();
        assertNotNull(actual);
    }

    @Test
    void getExportedType() {
         String actual = headerConfiguration.getExportedType();
        assertNotNull(actual);
    }
}