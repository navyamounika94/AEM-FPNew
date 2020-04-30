package com.toyota.tmna.lexusdrivers.core.models;

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
class GlobalFooterModelTest {

    private final AemContext context = new AemContext();
    @Mock
    private ModelFactory modelFactory;
    private   GlobalFooterModel globalFooterModel;


    @BeforeEach
    void setUp() {
        context.addModelsForClasses(GlobalFooterModel.class);
        context.load().json("/com/toyota/tmna/lexusdrivers/core/models/GlobalFooterTest.json", "/content");
        context.registerService(ModelFactory.class, modelFactory,
                org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);
        context.currentResource("/content");
        globalFooterModel = context.request().adaptTo(GlobalFooterModel.class);

    }

    @Test
    void getHeadlinePath() {
        String expected = "https://privacy.toyota.com/";
        String actual = globalFooterModel.getHeadlinePath();
        assertEquals(expected, actual);
    }

    @Test
    void getHeadline() {
        String expected = "DO NOT SELL MY PERSONAL INFORMATION";
        String actual = globalFooterModel.getHeadline();
        assertEquals(expected, actual);
    }

    @Test
    void getCopyRightDesc() {
        String expected = "<p>© 2006-2019 Lexus, a Division of Toyota Motor Sales, U.S.A., Inc. All information contained herein applies to U.S. vehicles only.</p>";
        String actual = globalFooterModel.getCopyRightDesc();
        assertEquals(expected, actual);
    }


    @Test
    void getCopyRightText() {
        String expected = "Safety Recalls & Service Campaigns";
        String actual = globalFooterModel.getCopyRightText();
        assertEquals(expected, actual);
    }


    @Test
    void getCopyRightLink() {
        String expected = "http://www.toyota.com/recall";
        String actual = globalFooterModel.getCopyRightLink();
        assertEquals(expected, actual);
    }

    @Test
    void getCopyopennewwindow() {
        String expected = "true";
        String actual = globalFooterModel.getCopyopennewwindow();
        assertEquals(expected, actual);
    }

    @Test
    void getHeadPathOpennewwindow() {
        String expected = "true";
        String actual = globalFooterModel.getHeadPathOpennewwindow();
        assertEquals(expected, actual);
    }


    @Test
    void getFootercolumnsOne() {
        context.currentResource("/content/footercolumns");
        globalFooterModel = context.request().adaptTo(GlobalFooterModel.class);
        String expected = "[{\"columns\":[{\"footerlinks\":[{\"linklist\":[{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/about\",\"linktitle\":\"About\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/contact\",\"linktitle\":\"contact us\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/\",\"linktitle\":\"lexus.com\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/offers\",\"linktitle\":\"Your Lexus Dealer\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/privacy\",\"linktitle\":\"privacy\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/privacy/legal-terms\",\"linktitle\":\"legal\",\"thirdpartyicon\":\"no\"}],\"footerColumnHeadline\":\"ABOUT LEXUS\"}]},{\"footerlinks\":[{\"linklist\":[{\"openinnew\":\"yes\",\"linktargeturl\":\"https://www.lexusfinancial.com\",\"linktitle\":\"End of Lease Options\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"https://www.lexusfinancial.com\",\"linktitle\":\"Lexus Financial Services\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"https://www.lexusfinancial.com/us/en/planning_tools/ways_to_pay.html\",\"linktitle\":\"Pay My Bill\",\"thirdpartyicon\":\"no\"}],\"footerColumnHeadline\":\"Finance &amp; Leasing\"}]},{\"footerlinks\":[{\"linklist\":[{\"openinnew\":\"yes\",\"linktargeturl\":\"https://see.lexus.com\",\"linktitle\":\"See Lexus\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.thelexuscollection.com\",\"linktitle\":\"Lexus Merchandise\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/lcertified\",\"linktitle\":\"L/Certified\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus-int.com/\",\"linktitle\":\"Lexus International\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/lexusplus\",\"linktitle\":\"Lexus Plus\",\"thirdpartyicon\":\"no\"}],\"footerColumnHeadline\":\"Brand &amp; Lifestyle\"}]},{\"footerlinks\":[{\"linklist\":[{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexus.com/service\",\"linktitle\":\"Service By Lexus\",\"thirdpartyicon\":\"no\"},{\"openinnew\":\"yes\",\"linktargeturl\":\"http://www.lexustirecenter.com/?utm_source\",\"linktitle\":\"Lexus Tire Center\",\"thirdpartyicon\":\"no\"}],\"footerColumnHeadline\":\"Service\"}]}]}]";
        String actual = globalFooterModel.getFootercolumnsOne();
        assertEquals(expected, actual);
    }

    @Test
    void getFootercolumnsSecond() {
        context.currentResource("/content/footercolumnsTwo");
        globalFooterModel = context.request().adaptTo(GlobalFooterModel.class);
        String expected = "[{\"openinnew\":\"yes\",\"linkstitle\":\"FAQ\",\"linksUrl\":\"http://lexus2.custhelp.com/\"},{\"openinnew\":\"yes\",\"linkstitle\":\"FIND A LEXUS DEALER\",\"linksUrl\":\"/lexusdrivers/service/dealers\"},{\"openinnew\":\"yes\",\"linkstitle\":\"CONTACT US\",\"linksUrl\":\"http://www.lexus.com/contact\"},{\"openinnew\":\"yes\",\"linkstitle\":\"ACCESSIBILITY\",\"linksUrl\":\"http://www.lexus.com/accessibility\"},{\"openinnew\":\"yes\",\"linkstitle\":\"California Privacy\",\"linksUrl\":\"https://www.lexus.com/privacy/online-statement#california-privacy\"}]";
        String actual = globalFooterModel.getFootercolumnsSecond();
        assertEquals(expected, actual);
    }

}