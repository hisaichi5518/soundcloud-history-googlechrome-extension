use strict;
use warnings;
use Plack::Request;
use LWP::UserAgent;

sub post_irc {
    my (%args) = @_;
    my $message = $args{msg} or die "required msg";
    my $uri = 'https://localhost:5519/'; # use App::Ikachan

    LWP::UserAgent->new->post($uri, [
        channel => "#hisaichi5518",
        msg     => $message,
        notice  => $args{notice} ? 1 : 0,
    ]);
}

sub {
    my $env = shift;
    my $req = Plack::Request->new($env);

    my $link  = $req->param("link");
    my $title = $req->param("title");

    post_irc(msg => "$title: $link", notice  => 1);

    return [200, [], ['{"result": "ok"}']];
};
