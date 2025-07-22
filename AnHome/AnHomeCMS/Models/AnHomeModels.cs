using System;
using System.Collections.Generic;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;
using Umbraco.Extensions;

namespace AnHomeCMS.Models
{
    // Base content page for all pages
    public class BaseContentPage
    {
        public string PageTitle { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public IPublishedContent BannerImage { get; set; }
    }

    // Home page model
    public class HomePage : BaseContentPage
    {
        public IPublishedContent IntroVideo { get; set; }
        public string CompanyInfo { get; set; }
        public IEnumerable<IPublishedContent> FeaturedProjects { get; set; }
        public IEnumerable<IPublishedContent> TransferProjects { get; set; }
        public BlockListModel CommunityActivities { get; set; }
        public BlockListModel Awards { get; set; }
        public BlockListModel Partners { get; set; }
        public BlockListModel OurTeam { get; set; }
    }

    // About page model
    public class AboutPage : BaseContentPage
    {
        public string CompanyIntro { get; set; }
        public string VisionMission { get; set; }
        public BlockListModel Leadership { get; set; }
        public BlockListModel Awards { get; set; }
        public BlockListModel Partners { get; set; }
    }

    // Services page model
    public class ServicesPage : BaseContentPage
    {
        public string ServiceIntro { get; set; }
        public string ProjectDistribution { get; set; }
        public string CommunityBuilding { get; set; }
        public string InvestmentConsulting { get; set; }
        public string AssetManagement { get; set; }
    }

    // Project page model
    public class ProjectPage : BaseContentPage
    {
        public BlockListModel FilterOptions { get; set; }
        public IEnumerable<IPublishedContent> ActiveProjects { get; set; }
        public IEnumerable<IPublishedContent> TransferProjects { get; set; }
        public BlockListModel InvestorProjects { get; set; }
        public IPublishedContent ProjectMap { get; set; }
        public string CallToAction { get; set; }
    }

    // Project item model
    public class ProjectItem : BaseContentPage
    {
        public string ProjectName { get; set; }
        public string Location { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public BlockListModel Features { get; set; }
        public IEnumerable<IPublishedContent> Gallery { get; set; }
        public string ContactInfo { get; set; }
        public string Status { get; set; }
    }

    // Community page model
    public class CommunityPage : BaseContentPage
    {
        public string Philosophy { get; set; }
        public BlockListModel FeaturedActivities { get; set; }
        public BlockListModel UpcomingEvents { get; set; }
        public BlockListModel TeamMembers { get; set; }
        public string CallToAction { get; set; }
    }

    // News page model
    public class NewsPage : BaseContentPage
    {
        public IEnumerable<IPublishedContent> ProjectNews { get; set; }
        public IEnumerable<IPublishedContent> CommunityNews { get; set; }
        public IEnumerable<IPublishedContent> InternalNews { get; set; }
        public IEnumerable<IPublishedContent> MediaGallery { get; set; }
    }

    // News item model
    public class NewsItem : BaseContentPage
    {
        public string NewsTitle { get; set; }
        public DateTime PublishDate { get; set; }
        public string Category { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public BlockListModel RelatedLinks { get; set; }
    }

    // Contact page model
    public class ContactPage : BaseContentPage
    {
        public string ContactInfo { get; set; }
        public IPublishedContent MapLocation { get; set; }
        public bool ContactForm { get; set; }
    }
}
